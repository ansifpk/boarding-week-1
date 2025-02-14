import { NextFunction, Request, Response } from "express";
import { userModel } from "../models/userModel";
import { wishlistModel } from "../models/wishlist";
import { validationResult } from "express-validator";
import { compareHash, creatHash } from "../service/password";
import { createAccessAndRefreshTocken } from "../service/tockens";
import { BadRequestError } from "../errors/badRequestError";

export const loginUser = async (req:Request,res:Response,next:NextFunction)=>{
   try {
   
       const {email,password} = req.body 
       const user = await userModel.findOne({email:email});
       if(user){
         let pass = await compareHash(password,user.password)
         if(!pass){
            throw new BadRequestError('Invalid Credentials')
         }
         const tockens = await createAccessAndRefreshTocken(user._id as string)

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
         res.send({success:true,user:user})
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
     
      const {email,password,name} = req.body 
      const user = await userModel.findOne({email:email});
      if(user){
         throw new BadRequestError('Email ALready Registered')
      }else{
           const pass = await creatHash(password);
           req.body.password = pass
           const user = userModel.build(req.body);
           await user.save()
           const tockens = await createAccessAndRefreshTocken(user._id as string)
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

           res.send({success:true,user:user})
      }
   } catch (error) {
    console.error(error)
    next(error)
   }
}

export const getWishlist = async (req:Request,res:Response,next:NextFunction)=>{
   try {
      const {userId} = req.params 
      const user = await wishlistModel.findOne({userId:userId});
      res.send({user})
   } catch (error) {
    console.error(error)
   }
}
export const addWishlist = async (req:Request,res:Response,next:NextFunction)=>{
   try {
      const {userId} = req.params 
      const {recipeId} = req.body;
      const wishlist = wishlistModel.build({
         userId,
         recipes:[recipeId]
      })
      await wishlist.save();
      res.send({wishlist})

   } catch (error) {
    console.error(error)
    next(error)
   }
}
export const handleWishlist = async (req:Request,res:Response,next:NextFunction)=>{
   try {
      const {userId} = req.params 
      const {recipeId} = req.body;
   
      let user = await wishlistModel.findOne({
         userId:userId,
         recipes:{$in:[recipeId]}
      });
      if(user){
         user = await wishlistModel.findOneAndUpdate({
            userId:userId
         },
      {$pull:{recipes:recipeId}},{new:true});
      }else{
         user = await wishlistModel.findOneAndUpdate({
            userId:userId
         },
      {$push:{recipes:recipeId}},{new:true});
      }
      res.send({user})
   } catch (error) {
    console.error(error)
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

