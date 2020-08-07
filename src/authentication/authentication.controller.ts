import EmailAlreadyInUseException from "exceptions/EmailAlreadyInUseException";
import { NextFunction, Request, Response, Router } from "express";
import Controller from "interfaces/controller.interface";
import validationMiddleware from "middleware/validation.middleware";
import * as bcrypt from 'bcrypt';
import CreateUserDto from "users/user.dto";
import userModel from "users/user.model";
import LogInDto from "./logIn.dto";
import WrongCredentialsException from "exceptions/WrongCredentialsException";
import TokenData from "interfaces/tokenData.interface";
import User from "users/user.interface";
import DataStoredInToken from "interfaces/dataStoredInToken.interface";
import { IsJWT } from "class-validator";
import { sign } from "jsonwebtoken";

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
        const userData: CreateUserDto = request.body;
        if (await this.user.findOne({ email: userData.email })) {
            next(new EmailAlreadyInUseException(userData.email));
        } else {
            const hashedPassword = await bcrypt.hash(userData.password, 10);  //make it so it automatically gets hashed instead of hashing here?
            const user = await this.user.create({
                name: userData.name,
                email: userData.email,
                password: hashedPassword
            });
            user.password = undefined;
            response.send(user);
        }

    };

    private logIn = async (request: Request, response: Response, next: NextFunction) => {
        const logInData: LogInDto = request.body;
        const user = await this.user.findOne({ email: logInData.email });
        if (user) {
          const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
          if (isPasswordMatching) {
            user.password = undefined;
            const tokenData = this.createToken(user);
            response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
            response.send(user);
          } else {
            next(new WrongCredentialsException());
          }
        } else {
          next(new WrongCredentialsException());
        }
    };

    private createToken(user: User) : TokenData {
        const expiresIn = 60*60;
        const secret = '21d1209u21d0921d12'; //set in ENV
        const dataStoredInToken: DataStoredInToken = {
            _id: user._id
        };
        return {
            expiresIn,
            token: sign(dataStoredInToken, secret, {expiresIn: expiresIn})
        };
    }

    private createCookie(tokenData: TokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
      }

}

export default AuthenticationController;