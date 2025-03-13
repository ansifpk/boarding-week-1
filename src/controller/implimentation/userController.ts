import { Request, Response, NextFunction } from "express";
import { IUserController } from "../interface/IuserControllerInterface";
import { inject, injectable } from "tsyringe";
import { IUserService } from "../../service/interfaces/IUserService";
import { StatusCode } from "../../statusCodes/statusCode";
 
@injectable()
export class UserController implements IUserController{
    constructor(@inject("UserService") private userService:IUserService){}

    async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
       const user =  await this.userService.loginUser(req,res,next)
       res.status(StatusCode.SUCCESS).send(user);      
    }
    async googleAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
        const user =  await this.userService.googleAuth(req,res,next)
        res.status(StatusCode.SUCCESS).send(user)
    }
    async signUpUser(req: Request, res: Response, next: NextFunction): Promise<void> {
       await this.userService.signUpUser(req,res,next); 
       res.status(StatusCode.SUCCESS).send({ success: true });
    }
    async checkOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
        const user =  await this.userService.checkOtp(req,res,next);
        res.status(StatusCode.SUCCESS).send(user);
    }
    async resentOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
        await this.userService.resentOtp(req,res,next);
        res.status(StatusCode.SUCCESS).send({success:true});
    }
    async refreshTocken(req: Request, res: Response, next: NextFunction): Promise<void> {
        await this.userService.refreshTocken(req,res,next);
        res.status(StatusCode.SUCCESS).json({success:true});
    }
    async signOutUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        await this.userService.signOutUser(req,res,next);
        res.status(StatusCode.SUCCESS).json({success:true});
    }
    
    
}