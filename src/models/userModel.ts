import mongoose from "mongoose";
import { IUser } from "./interfaces/IUser";
interface UserDoc extends mongoose.Document{
    _id:string,
    name:string,
    email:string,
    password:string
}

interface UserModel extends mongoose.Model<UserDoc>{
    build(userAtr:IUser):UserDoc
}
const userScheema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true,
    toJSON: {
      transform(doc,ret){
        delete ret.__v;
      }
    }
});
userScheema.statics.build = (userAtr:IUser)=>{
    return new userModel(userAtr)
}
const userModel = mongoose.model<UserDoc, UserModel>("User", userScheema);
export {userModel}

