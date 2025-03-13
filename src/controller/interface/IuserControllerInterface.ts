import { NextFunction, Request, Response } from "express";

export interface IUserController{
    loginUser(req:Request,res:Response,next:NextFunction):Promise<void>
    googleAuth(req:Request,res:Response,next:NextFunction):Promise<void>
    signUpUser(req:Request,res:Response,next:NextFunction):Promise<void>
    checkOtp(req:Request,res:Response,next:NextFunction):Promise<void>
    resentOtp(req:Request,res:Response,next:NextFunction):Promise<void>
    refreshTocken(req:Request,res:Response,next:NextFunction):Promise<void>
    signOutUser(req:Request,res:Response,next:NextFunction):Promise<void>
} 