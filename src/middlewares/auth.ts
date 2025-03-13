import { NextFunction,Request,Response } from "express"
import { NotAuthorizedError } from "../errors/NotAuthorizedError"
import { verifyAccessTocken } from "../service/tockens"
import { userModel } from "../models/userModel"
import { injectable } from "tsyringe"

// export const isAuth = async(req:Request,res:Response,next:NextFunction) =>{
//     try {

//         console.log(req.cookies.accessToken)
        // if(!req.cookies){
        //     throw new NotAuthorizedError()
        //    } 
        //   if(!req.cookies.accessToken){
        //     throw new NotAuthorizedError()
        //    } 
        //   const check = await verifyAccessTocken(req.cookies.accessToken)
        //   if(!check){
        //     throw new NotAuthorizedError()
        //   }
        //   const user = await userModel.findOne({_id:check._id});
        //   if(!user){
        //     throw new NotAuthorizedError()
        //   }
        //   next();
//     } catch (error) {
//         console.error(error)
//         next(error)
//     }
// }
@injectable()
export class Middleware {
  constructor(){}
   public async isAuth(req:Request,res:Response,next:NextFunction):Promise<void>{
    try {
      console.log("hi");
      
      if(!req.cookies){
        throw new NotAuthorizedError()
       } 
      if(!req.cookies.accessToken){
        throw new NotAuthorizedError()
       } 
      const check = await verifyAccessTocken(req.cookies.accessToken)
      if(!check){
        throw new NotAuthorizedError()
      }
      const user = await userModel.findOne({_id:check._id});
      if(!user){
        throw new NotAuthorizedError()
      }
      next();
    } catch (error) {
      console.error(error)
      next(error)
    }
   }
}
