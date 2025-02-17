import { Request,Response ,NextFunction} from "express";
import { wishlistModel } from "../models/wishlist";


export const getWishlist = async (req:Request,res:Response,next:NextFunction)=>{
    try {
       const {userId} = req.params
     
       const wishlist = await wishlistModel.findOne({userId:userId});
       res.send({wishlist})
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
        
       let wishlist = await wishlistModel.findOne({
          userId:userId,
          recipes:{$in:[recipeId]}
       });
      
       if(wishlist){
         
         
         wishlist = await wishlistModel.findOneAndUpdate({
             userId:userId
          },
       {$pull:{recipes:recipeId}},{new:true});
       }else{
        
         wishlist = await wishlistModel.findOneAndUpdate({
             userId:userId
          },
       {$push:{recipes:recipeId}},{new:true});
       }
       res.send({wishlist})
    } catch (error) {
     console.error(error)
     next(error)
    }
 }