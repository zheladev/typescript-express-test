import App from './app';
import * as bodyParser from 'body-parser';
import PostsController from './posts/post.controller';
import errorMiddleware from './middleware/error.middleware';
import loggerMiddleware from './middleware/routeLogger.middleware';
import cookieParser = require('cookie-parser');
import AuthenticationController from './authentication/authentication.controller';

const app = new App(
  [
    new PostsController(),
    new AuthenticationController(),
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