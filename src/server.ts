import App from './app';
import * as bodyParser from 'body-parser';
import PostsController from './posts/post.controller';
import errorMiddleware from './middleware/error.middleware';
import loggerMiddleware from './middleware/routeLogger.middleware';
import cookieParser = require('cookie-parser');

const app = new App(
  [
    new PostsController(),
  ],
  [
    bodyParser.json(),
    loggerMiddleware,
    errorMiddleware,
    cookieParser(),
  ],
  3000,
);
 
app.listen();