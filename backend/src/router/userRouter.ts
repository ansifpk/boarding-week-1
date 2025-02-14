import express, { Request, Response } from "express"
import {addWishlist, getWishlist, handleWishlist, loginUser, signOutUser, signUpUser} from '../controller/userController'
import { body, validationResult } from "express-validator"
import { ValidateRequestError } from "../errors/validateRequestError";
import { ValidateRequest } from "../middlewares/validateRequest";
const router = express.Router();


router.post('/signIn',
   [ 
    body("email")
    .isEmail()
    .withMessage("Invalid Email or Password"),
    body("password")
    .notEmpty()
    .withMessage("invalid Email or Password"),
   ],
   ValidateRequest
   ,
    loginUser
)
.post('/signUp',
    [
        body("email")
        .isEmail()
        .withMessage("Invalid Email or Password"),
        body("name")
        .trim()
        .notEmpty()
        .withMessage("Invalid name"),
        body("password")
        .notEmpty()
        .withMessage("invalid Email or Password"),
    ],
    ValidateRequest
    ,
    signUpUser
)
.get('/wishlist/:userId',getWishlist)
.post('/wishlist/:userId',
    addWishlist
)
.patch('/wishlist/:userId',
    handleWishlist
)
.post('/signOut',
    signOutUser
)

export {router as userRouter}