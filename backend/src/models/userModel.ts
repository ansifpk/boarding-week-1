import mongoose from "mongoose";
interface UserDoc extends mongoose.Document{
    name:string,
    email:string,
    password:string
}
interface UserAtr{
    name:string,
    email:string,
    password:string
}
interface UserModel extends mongoose.Model<UserDoc>{
    build(userAtr:UserAtr):UserDoc
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
userScheema.statics.build = (userAtr:UserAtr)=>{
    return new userModel(userAtr)
}
const userModel = mongoose.model<UserDoc, UserModel>("User", userScheema);
export {userModel}

