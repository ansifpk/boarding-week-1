import { StatusCode } from "../statusCodes/statusCode";
import { CustomError } from "./customError";

export class NotFoundError extends CustomError{
    statusCode= StatusCode.NOT_FOUND_REQUEST;
    constructor(message:string){
        super(message);
        Object.setPrototypeOf(this,NotFoundError.prototype);
    }
    serializeErrors(){
        return [{message:this.message}]
    }
    
}