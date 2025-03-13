import { NextFunction, Request, Response } from "express";

export interface IWishlistController{
    getWishlist(req:Request,res:Response,next:NextFunction): Promise<void>
    addWishlist(req:Request,res:Response,next:NextFunction): Promise<void>
    handleWishlist(req:Request,res:Response,next:NextFunction): Promise<void>
}