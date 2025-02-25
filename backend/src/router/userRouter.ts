import express, { Request, Response } from "express"
import { checkOtp, googleAuth, loginUser, refreshTocken, resentOtp, signOutUser, signUpUser} from '../controller/userController'
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
router.post('/googleAuth',googleAuth)
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
.post('/otp',checkOtp)
.post('/resentOtp',resentOtp)

.post('/signOut',
    signOutUser
)

export {router as userRouter}