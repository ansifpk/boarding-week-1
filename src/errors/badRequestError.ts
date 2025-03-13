import { StatusCode } from "../statusCodes/statusCode";
import { CustomError } from "./customError";

export class BadRequestError extends CustomError{
    statusCode= StatusCode.BAD_REQUEST;
    constructor(public message:string){
        super(message)
        Object.setPrototypeOf(this,BadRequestError.prototype)
    }

    serializeErrors() {
        return [{message:this.message}]
    }
    
}