import { StatusCode } from "../statusCodes/statusCode";
import { CustomError } from "./customError";

export class NotFoundError extends CustomError{
    statusCode= StatusCode.NOT_FOUND_REQUEST;
    constructor(){
        super("Route not found");
        Object.setPrototypeOf(this,NotFoundError.prototype);
    }
    serializeErrors(){
        return [{message:"Route not found"}]
    }
    
}