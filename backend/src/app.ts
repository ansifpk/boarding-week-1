import express, { ErrorRequestHandler, json, urlencoded } from  'express';
import "express-async-errors";
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { userRouter } from './router/userRouter';
import { NotFoundError } from './errors/notFoundError';
import { errorHandler } from './middlewares/errorHandler';
const app = express();

app.use(json())
app.use(urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin:['http://localhost:5173'],
    methods:["GET",'POST'],
    credentials:true
    }))
app.use("/api/user",userRouter)
app.all('*',(req,res)=>{
    throw new NotFoundError()
});
app.use(errorHandler as any)

export default app
