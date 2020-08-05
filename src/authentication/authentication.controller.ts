import EmailAlreadyInUseException from "exceptions/EmailAlreadyInUseException";
import { NextFunction, Request, Response, Router } from "express";
import Controller from "interfaces/controller.interface";
import validationMiddleware from "middleware/validation.middleware";
import * as bcrypt from 'bcrypt';
import CreateUserDto from "users/user.dto";
import userModel from "users/user.model";
import LogInDto from "./logIn.dto";

class AuthenticationController implements Controller {
    public path: string = '/auth';
    public router: Router = Router();
    private user = userModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.registration);
    this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), this.logIn);
    }

    private registration = async (request: Request, response: Response, next: NextFunction) => {
        //TODO
    };

    private logIn = async (request: Request, response: Response, next: NextFunction) => {
        //TODO
    };

    
}