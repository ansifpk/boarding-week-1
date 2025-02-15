import { CustomError } from "./customError"

export class ForBiddenError extends CustomError{
    statusCode = 403;
    constructor(){
        super("Access Forbidden")
        Object.setPrototypeOf(this,ForBiddenError.prototype)
    }
    serializeErrors(){
        return  [{message:"Access Forbidden"}]
    }

}