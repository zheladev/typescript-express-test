import * as express from 'express';
import * as bodyParser from 'body-parser';

//middleware type definition
type Middleware = (req: express.Request, res: express.Response, next: Function) => void;

//example middleware
const loggerMiddleware: Middleware = (req: express.Request, res: express.Response, next: Function) => {
    console.log(`${req.method} ${req.path}`);
    next();
}

const app = express();

//adding middleware to express
app.use(loggerMiddleware); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));




app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/', (req, res) => {
    console.log(req);
    res.send(req.body);
});

app.listen(3000);