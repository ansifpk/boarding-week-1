import mongoose from "mongoose";
import { IOtp } from "./interfaces/IOtp";
interface OtpDoc extends mongoose.Document{
    email:string,
    otp:string,
}

interface OtpModel extends mongoose.Model<OtpDoc>{
    build(userAtr:IOtp):OtpDoc
}
const otpScheema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true
     },
    otp: { 
        type: String, 
        required: true 
    },
},{
    timestamps:true,
    toJSON: {
      transform(doc,ret){
        delete ret.__v;
      }
    }
});
otpScheema.statics.build = (userAtr:IOtp)=>{
    return new otpModel(userAtr)
}
otpScheema.index({ createdAt: 1 }, { expireAfterSeconds: 120  });
const otpModel = mongoose.model<OtpDoc, OtpModel>("Otp", otpScheema);
export {otpModel}

