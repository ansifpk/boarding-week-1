import { Request ,Response,NextFunction} from "express"
import { IUser } from "../../models/interfaces/IUser"

export interface IUserService{
    loginUser(req:Request,res:Response,next:NextFunction):Promise<void| IUser >
    googleAuth(req:Request,res:Response,next:NextFunction):Promise<void | IUser>
    signUpUser(req:Request,res:Response,next:NextFunction):Promise<void | boolean>
    checkOtp(req:Request,res:Response,next:NextFunction):Promise<IUser | void>
    resentOtp(req:Request,res:Response,next:NextFunction):Promise<void | boolean>
    refreshTocken(req:Request,res:Response,next:NextFunction):Promise<void | {accessToken:string,refreshToken:string}>
    signOutUser(req:Request,res:Response,next:NextFunction):Promise<void | boolean>
}