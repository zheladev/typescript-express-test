import * as express from 'express';
import * as bodyParser from 'body-parser';

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers, port, middlewares = [bodyParser.json()]) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares(middlewares);
        this.initializeControllers(controllers);
        
    }
    initializeControllers(controllers: Array<any>) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        })
    }
    

    initializeMiddlewares(middlewares: Array<any>) {
        middlewares.forEach((middleware) => {
            this.app.use(middleware);
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on ${this.port}`)
        })
    }
}

export default App;
