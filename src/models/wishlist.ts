import mongoose from "mongoose";
import { IWishlist } from "./interfaces/IWishlist";


interface WishlistDoc extends mongoose.Document{
    userId:string,
    recipes:string[],
}

interface WishlistModel extends mongoose.Model<WishlistDoc>{
    build(WishlistAttr:IWishlist):WishlistDoc
} 

const wishlistScheem = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    recipes:[{
        type:Number,
        required:true
    }]
},{
    timestamps:true,
    toJSON: {
        transform(doc,ret){
          delete ret.__v;
        }
      }
});

wishlistScheem.statics.build = (wishListAttr:IWishlist)=>{
    return new wishlistModel(wishListAttr)
}
const wishlistModel = mongoose.model<WishlistDoc,WishlistModel>("Wishlist",wishlistScheem)
export {wishlistModel}

