import mongoose from "mongoose";


interface WishlistAttr{
    userId:string,
    recipes:string[],
}
interface WishlistDoc extends mongoose.Document{
    userId:string,
    recipes:string[],
}

interface WishlistModel extends mongoose.Model<WishlistDoc>{
    build(WishlistAttr:WishlistAttr):WishlistDoc
} 

const wishlistScheem = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    recipes:[{
        type:String,
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

wishlistScheem.statics.build = (wishListAttr:WishlistAttr)=>{
    return new wishlistModel(wishListAttr)
}
const wishlistModel = mongoose.model<WishlistDoc,WishlistModel>("Wishlist",wishlistScheem)
export {wishlistModel}

