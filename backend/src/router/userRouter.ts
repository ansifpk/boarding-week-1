import express, { Request, Response } from "express"
import { googleAuth, loginUser, refreshTocken, signOutUser, signUpUser} from '../controller/userController'
import { body } from "express-validator"
import { ValidateRequest } from "../middlewares/validateRequest";
import { isAuth } from "../middlewares/auth";
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
router.post('/googleAuth',
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
    googleAuth
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

.post('/refresh-token/:userId',refreshTocken)

.post('/signOut',
    signOutUser
)

export {router as userRouter}