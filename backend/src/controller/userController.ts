import { NextFunction, Request, Response } from "express";
import { userModel } from "../models/userModel";
import { wishlistModel } from "../models/wishlist";
import { compareHash, creatHash } from "../service/password";
import { createAccessAndRefreshTocken } from "../service/tockens";
import { BadRequestError } from "../errors/badRequestError";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";
import { ForBiddenError } from "../errors/ForbiddenError";

export const loginUser = async (req:Request,res:Response,next:NextFunction)=>{
   try {
   
       const {email,password} = req.body 
       const user = await userModel.findOne({email:email});
       if(user){
          
          const {_id,name,email} = user;
         let pass = await compareHash(password,user.password)
         if(!pass){
            throw new BadRequestError('Invalid Credentials')
         }
         const tockens = await createAccessAndRefreshTocken(_id as string)

            res.cookie("accessTocken",tockens?.accessTocken,{
               httpOnly:true,
               secure:process.env.NODE_ENV !== 'development',
               sameSite:'strict',
               maxAge:30 * 24 * 60 * 60 * 1000
            })
            res.cookie("refreshTocken",tockens?.refreshTocken,{
               httpOnly:true,
               secure:process.env.NODE_ENV !== 'development',
               sameSite:'strict',
               maxAge:30 * 24 * 60 * 60 * 1000
            })
         res.send({success:true,user:{_id,email,name}})
       }else{
         throw new BadRequestError('Invalid Credentials')
       }
      
   } catch (error) {
    console.error(error)
     next(error)
   }
}
export const signUpUser = async (req:Request,res:Response,next:NextFunction)=>{
   try {
     
      const {email,password} = req.body 
      const user = await userModel.findOne({email:email});
      if(user){
         throw new BadRequestError('Email ALready Registered')
      }else{
           const pass = await creatHash(password);
           req.body.password = pass
           const user = userModel.build(req.body);
           await user.save()
           const {_id,name,email} = user;
           const tockens = await createAccessAndRefreshTocken(_id as string)
            res.cookie("accessTocken",tockens?.accessTocken,{
               httpOnly:true,
               secure:process.env.NODE_ENV !== 'development',
               sameSite:'strict',
               maxAge: 15 * 60 * 1000
            })
            res.cookie("refreshTocken",tockens?.refreshTocken,{
               httpOnly:true,
               secure:process.env.NODE_ENV !== 'development',
               sameSite:'strict',
               maxAge:30 * 24 * 60 * 60 * 1000
            })

           res.send({success:true,user:{_id,email,name}})
      }
   } catch (error) {
    console.error(error)
    next(error)
   }
}

export const refreshTocken = async(req:Request,res:Response,next:NextFunction) => {
    try {
     const refreshTocken  =  req.cookies?.refreshTocken;
     const {userId} = req.params
     if(!refreshTocken){
      throw new ForBiddenError()
     }
       const tockens  = await createAccessAndRefreshTocken(userId);
       res.cookie("accessTocken",tockens?.accessTocken,{
         httpOnly:true,
         secure:process.env.NODE_ENV !== 'development',
         sameSite:'strict',
         maxAge: 15 * 60 * 1000
      })
      res.cookie("refreshTocken",tockens?.refreshTocken,{
         httpOnly:true,
         secure:process.env.NODE_ENV !== 'development',
         sameSite:'strict',
         maxAge:30 * 24 * 60 * 60 * 1000
      })
      
    } catch (error) {
      console.error(error);
      next(error)
    }
}

export const signOutUser = async(req:Request,res:Response,next:NextFunction)=>{
   try {
      res.cookie("accessTocken",'')
      res.cookie("refreshTocken",'')
      res.send({success:true})
   } catch (error) {
      console.error(error)
      next(error)
   }
}

