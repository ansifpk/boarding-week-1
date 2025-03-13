import { Router } from "express";
import { IRoutes } from "../interface/IRoutes";
import { inject, injectable } from "tsyringe";
import { IWishlistController } from "../../controller/interface/IwishlistControllerInterface";
import { Middleware } from "../../middlewares/auth";

@injectable()
export class WishlistRoutes implements IRoutes{
    public router = Router();
    constructor(
        @inject("WishlistController") private wishlistController: IWishlistController,
        @inject("Middleware") private authMiddleware: Middleware
      ) {
        this.initializeRoutes();
      }
      private initializeRoutes() {
        this.router.get('/:userId',
          this.authMiddleware.isAuth.bind(this.authMiddleware),
          this.wishlistController.getWishlist.bind(this.wishlistController)
        )
        this.router.patch('/:userId',
          this.authMiddleware.isAuth.bind(this.authMiddleware),
          this.wishlistController.handleWishlist.bind(this.wishlistController)
        )
        this.router.post('/:userId',
          this.authMiddleware.isAuth.bind(this.authMiddleware),
          this.wishlistController.addWishlist.bind(this.wishlistController)
        )
      }
}