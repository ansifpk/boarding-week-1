import { NextFunction, Request, Response } from "express";
import { IWishlist } from "../../models/interfaces/IWishlist";

export interface IWishlistService{
    getWishlist(req:Request,res:Response,next:NextFunction):Promise<null|IWishlist>
    addWishlist(req:Request,res:Response,next:NextFunction):Promise<IWishlist|void>
    handleWishlist(req:Request,res:Response,next:NextFunction):Promise<IWishlist|void|null>
}