import mongoose from "mongoose";
interface OtpDoc extends mongoose.Document{
    email:string,
    otp:string,
}
interface OtpAtr{
    email:string,
    otp:string,
}
interface OtpModel extends mongoose.Model<OtpDoc>{
    build(userAtr:OtpAtr):OtpDoc
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
otpScheema.statics.build = (userAtr:OtpAtr)=>{
    return new otpModel(userAtr)
}
otpScheema.index({ createdAt: 1 }, { expireAfterSeconds: 120  });
const otpModel = mongoose.model<OtpDoc, OtpModel>("Otp", otpScheema);
export {otpModel}

