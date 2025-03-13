import { StatusCode } from "../statusCodes/statusCode";
import { CustomError } from "./customError"

export class ForBiddenError extends CustomError{
    statusCode = StatusCode.FORBIDDEN_REQUEST;
    constructor(){
        super("Access Forbidden")
        Object.setPrototypeOf(this,ForBiddenError.prototype)
    }
    serializeErrors(){
        return  [{message:"Access Forbidden"}]
    }

}