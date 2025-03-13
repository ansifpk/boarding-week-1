import { NextFunction, Request, Response } from "express";
import { IWishlistService } from "../interfaces/IWishlistService";
import { inject, injectable } from "tsyringe";
import { IWishlistRepository } from "../../repository/interfaces/IWishlistRepository";
import { IWishlist } from "../../models/interfaces/IWishlist";
import { NotFoundError } from "../../errors/notFoundError";

@injectable()
export class WishlistService implements IWishlistService{
    constructor(
        @inject("WishlistRepository") private wishlistRepository: IWishlistRepository,
      ) {}
    async getWishlist(req:Request,res:Response,next:NextFunction): Promise<null | IWishlist> {
       const {userId} = req.params;
       const wishlist = await this.wishlistRepository.findOneById(userId);
       return wishlist;
    }
    async addWishlist(req:Request,res:Response,next:NextFunction): Promise<IWishlist|void> {
        try {
            const {userId} = req.params 
            const {recipeId} = req.body;
            
         const wishlist =  await this.wishlistRepository.create(userId,recipeId)
         if(wishlist){
             return wishlist
         }

         } catch (error) {
          console.error(error)
          next(error)
         }
    }
    async handleWishlist(req:Request,res:Response,next:NextFunction): Promise<IWishlist|void | null> {
        try {
            const {userId} = req.params 
            const {recipeId} = req.body;
            const wishlist = await this.wishlistRepository.findOneById(userId);
            if(!wishlist){
              throw new NotFoundError("Wishlist not found..")
            }
             const check  = await this.wishlistRepository.findOne(userId,recipeId)
             if(check){
               const wishlist =  await this.wishlistRepository.removeRecipie(userId,recipeId)
               return  wishlist 
             }else{
                const wishlist = await this.wishlistRepository.addRecipie(userId,recipeId);
                return  wishlist 
             }
         } catch (error) {
          console.error(error)
          next(error)
         }
    }

}