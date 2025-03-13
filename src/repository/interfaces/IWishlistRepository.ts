import { IWishlist } from "../../models/interfaces/IWishlist"

export interface IWishlistRepository{
    findOneById(userId:string):Promise<IWishlist|null>
    findOne(userId:string,recipeId:string):Promise<IWishlist|null>
    create(userId:string,recipeId:string):Promise<IWishlist>
    removeRecipie(userId:string,recipeId:string):Promise<IWishlist|void|null>
    addRecipie(userId:string,recipeId:string):Promise<IWishlist|void | null>
}
// userId:userId,
//           recipes:{$in:[recipeId]}

// const wishlist = wishlistModel.build({
//           userId,
//           recipes:[recipeId]
//        })