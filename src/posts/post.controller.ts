import * as express from 'express';
import Controller from 'interfaces/controller.interface';
import Post from './post.interface';

class PostsController implements Controller {
    public path = '/posts';
    public router = express.Router();

    private posts: Post[] = [
        {
            author: 'Aitor',
            content: 'Viva Symphogear',
            title: 'Symphogear'
        }
    ]

    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.getAllPosts);
        this.router.post(this.path, this.createAPost);
    }

    getAllPosts = (request: express.Request, response: express.Response) => {
        response.send(this.posts);
    }
    
    createAPost = (request: express.Request, response: express.Response) => {
        const post: Post = request.body;
        this.posts.push(post);
        response.send(post);
    }
}

export default PostsController;