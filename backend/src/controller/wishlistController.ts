import { Request,Response ,NextFunction} from "express";
import { wishlistModel } from "../models/wishlist";


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