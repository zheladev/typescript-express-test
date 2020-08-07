import HttpException from '../exceptions/HttpException';
import * as express from 'express';
import Controller from 'interfaces/controller.interface';
import Post from './post.interface';
import postModel from './post.model';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import validationMiddleware from 'middleware/validation.middleware';
import CreatePostDto from './post.dto';
import authMiddleware from 'middleware/auth.middleware';
import RequestWithUser from 'interfaces/requestWithUser.interface';
import { Types } from 'mongoose';

class PostsController implements Controller {
    public path = '/posts';
    public router = express.Router();
    private post = postModel;

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(this.path, this.getAllPosts);
        this.router.get(`${this.path}/:id`, this.getPostById);
        this.router
          .all(`${this.path}/*`, authMiddleware)
          .patch(`${this.path}/:id`, validationMiddleware(CreatePostDto, true), this.modifyPost)
          .delete(`${this.path}/:id`, this.deletePost)
          .post(this.path, authMiddleware, validationMiddleware(CreatePostDto), this.createPost);
    }
    private deletePost = (request: RequestWithUser, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        this.post.findByIdAndDelete(id)
            .then((successResponse) => {
                if (successResponse) {
                    response.send(200);
                  } else {
                    next(new PostNotFoundException(id));
                  }
            });
    }
    private modifyPost = (request: RequestWithUser, response: express.Response, next: express.NextFunction) => {
        //TODO: add modifiedBy and modifiedAt attr
        const id = request.params.id;
        const postData: Post = request.body;
        this.post.findByIdAndUpdate(id, postData, { new: true })
            .then((post) => {
                if (post) {
                    response.send(post);
                  } else {
                    next(new PostNotFoundException(id));
                  }
            });
    }
    private getPostById = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        this.post.findById(id)
            .then((post) => {
                if (post) {
                    response.send(post);
                  } else {
                    next(new PostNotFoundException(id));
                  }
            })
            .catch((err) => {
                next(new HttpException(400, `Bad Request, ${id} is not a proper Post Id`));
            });
    }

    private getAllPosts = (request: express.Request, response: express.Response) => {
        this.post.find()
            .then((posts) => {
                response.send(posts);
            })
    }

    private createPost = (request: RequestWithUser, response: express.Response) => {
        const postData: Post = request.body;
        const createdPost = new this.post({
            ...postData,
            authorId: Types.ObjectId(request.user._id)
        });
        createdPost.save()
            .then((savedPost) => {
                response.send(savedPost);
            });
    }
}

export default PostsController;