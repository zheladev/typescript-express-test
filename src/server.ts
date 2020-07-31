import App from './app';
import * as bodyParser from 'body-parser';
import PostsController from './posts/post.controller';

const app = new App(
  [
    new PostsController(),
  ],
  [
    bodyParser.json(),
    (req: Request, res, next) => {
      console.log(`${req.method} ${req.url}`);
      next();
    }

  ],
  3000,
);
 
app.listen();