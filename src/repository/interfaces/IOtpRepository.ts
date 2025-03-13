import { IOtp } from "../../models/interfaces/IOtp"

export interface IOtpRepository{
    create(email:string,otp:string):Promise<void|IOtp>
    findOne(email:string):Promise<null|IOtp>
    deleteOne(email:string):Promise<void>
}