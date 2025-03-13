import { Request, Response, NextFunction } from "express";
import { IWishlistController } from "../interface/IwishlistControllerInterface";
import { IWishlistService } from "../../service/interfaces/IWishlistService";
import { inject, injectable } from "tsyringe";
import { StatusCode } from "../../statusCodes/statusCode";

@injectable()
export class WishlistController implements IWishlistController{
    constructor(@inject("WishlistService") private wishlistService:IWishlistService){}

    async getWishlist(req: Request, res: Response, next: NextFunction): Promise<void> {
        const wishlist = await this.wishlistService.getWishlist(req,res,next);
        res.status(StatusCode.SUCCESS).send(wishlist)
    }
    async addWishlist(req: Request, res: Response, next: NextFunction): Promise<void> {
        const wishlist  = await this.wishlistService.addWishlist(req,res,next);
        res.status(StatusCode.SUCCESS).send(wishlist)
    }
    async handleWishlist(req: Request, res: Response, next: NextFunction): Promise<void> {
        const wishlist  = await this.wishlistService.handleWishlist(req,res,next);
        res.status(StatusCode.SUCCESS).send(wishlist)
    }
    
} 