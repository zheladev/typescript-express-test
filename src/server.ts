import App from './app';
import * as bodyParser from 'body-parser';
import PostsController from './posts/post.controller';
import errorMiddleware from './middleware/error.middleware';
import loggerMiddleware from './middleware/routeLogger.middleware';

const app = new App(
  [
    new PostsController(),
  ],
  [
    bodyParser.json(),
    loggerMiddleware,
    errorMiddleware,
  ],
  3000,
);
 
app.listen();