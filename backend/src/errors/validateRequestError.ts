import { ValidationError } from "express-validator";
import { CustomError } from "./customError";


export class ValidateRequestError extends CustomError{
    statusCode= 400;
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