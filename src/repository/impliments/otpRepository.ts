import { IOtp } from "../../models/interfaces/IOtp";
import { otpModel } from "../../models/otpModel";
import { IOtpRepository } from "../interfaces/IOtpRepository";

export class OtpRepository implements IOtpRepository{
    async create(email:string,otp:string): Promise<void | IOtp> {
        
      const data = otpModel.build({email,otp})
      await data.save()
    }
    async deleteOne(email: string): Promise<void> {
      await otpModel.findOneAndDelete({email:email})
    }
    async findOne(email: string): Promise<null | IOtp>  {
        const otp = await otpModel.findOne({email:email});
        return otp;
    }
    
}