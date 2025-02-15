import { NextFunction,Request,Response } from "express"
import { NotAuthorizedError } from "../errors/NotAuthorizedError"
import { verifyAccessTocken } from "../service/tockens"
import { userModel } from "../models/userModel"

export const isAuth = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        req.cookies.accessTocken
        if(!req.cookies){
            throw new NotAuthorizedError()
           } 
          if(!req.cookies.accessTocken){
            throw new NotAuthorizedError()
           } 

          const check = await verifyAccessTocken(req.cookies.accessTocken)
          if(!check){
            throw new NotAuthorizedError()
          }
          const user = await userModel.findOne({_id:check._id});
          if(!user){
            throw new NotAuthorizedError()
          }
          next();
    } catch (error) {
        next(error)
    }
}