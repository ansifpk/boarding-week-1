import { StatusCode } from "../statusCodes/statusCode";
import { CustomError } from "./customError";


export class NotAuthorizedError extends CustomError{
    statusCode = StatusCode.NOT_AUTHORIZED_REQUEST;
    constructor(){
        super("Not Autherized")
        Object.setPrototypeOf(this,NotAuthorizedError.prototype)
    }
    
    serializeErrors(){
        return [{message:"Not Autherized"}]
    }
    
}