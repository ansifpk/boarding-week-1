import { ValidationError } from "express-validator";
import { CustomError } from "./customError";
import { StatusCode } from "../statusCodes/statusCode";


export class ValidateRequestError extends CustomError{
    statusCode= StatusCode.BAD_REQUEST;
    constructor(public errors:ValidationError[]){
        super("Invalid Request")
        Object.setPrototypeOf(this,ValidateRequestError.prototype)
    }
    serializeErrors(){ 
        return this.errors.map(err=>{
         return {message:err.msg}
        })
    }
    
}