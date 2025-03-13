import express, { json, urlencoded } from  'express';
import "express-async-errors";
import "reflect-metadata";
import container from './config/diContainer';
import cors from 'cors'
import cookieParser from 'cookie-parser';
// import { userRouter } from './router/userRouter';
import { NotFoundError } from './errors/notFoundError';
import { errorHandler } from './middlewares/errorHandler';
// import  wishlistRouter  from './router/wishlistRouter';
import { UserRoutes } from './router/impliments/userRouters';
import { WishlistRoutes } from './router/impliments/wishlistRoutes';
// import { WishlistRoutes } from './router/impliments/wishlistRoutes';
const app = express();

app.use(json())
app.use(urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin:['http://localhost:5173','https://boarding-week-1.vercel.app'],
    credentials:true
    }))
const userRouter = container.resolve(UserRoutes)
const wishlistRouter = container.resolve(WishlistRoutes)
app.use("/api/user",userRouter.router)
app.use("/api/wishlist",wishlistRouter.router)
app.all('*',(req,res)=>{
    throw new NotFoundError("Path not found")
});
app.use(errorHandler as any)

export default app
