import express from 'express';
import { addWishlist, getWishlist, handleWishlist } from '../controller/wishlistController';
import { isAuth } from '../middlewares/auth';
const router = express.Router();

router
.get('/:userId',isAuth,getWishlist)
.post('/:userId',addWishlist)
.patch('/:userId',handleWishlist)

export default router