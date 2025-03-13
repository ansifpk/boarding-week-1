import { IWishlist } from "../../models/interfaces/IWishlist";
import { wishlistModel } from "../../models/wishlist";
import { IWishlistRepository } from "../interfaces/IWishlistRepository";

export class WIshlistRepository implements IWishlistRepository {

  async removeRecipie(
    userId: string,
    recipeId: string
  ): Promise<IWishlist | void | null> {
    const wishlist = await wishlistModel.findOneAndUpdate(
        {
          userId: userId,
        },
        { $pull: { recipes: recipeId } },
        { new: true }
      );
      return wishlist;
  }
  async addRecipie(
    userId: string,
    recipeId: string
  ): Promise<IWishlist | void | null> {
   const wishlist = await wishlistModel.findOneAndUpdate({
        userId:userId
     },
  {$push:{recipes:recipeId}},{new:true});
  return wishlist;
  }
  async findOneById(userId: string): Promise<IWishlist | null> {
    const wishlist = await wishlistModel.findOne({ userId: userId });
    return wishlist;
  }
  async findOne(userId: string, recipeId: string): Promise<IWishlist | null> {
    let wishlist = await wishlistModel.findOne({
      userId: userId,
      recipes: { $in: [recipeId] },
    });
    return wishlist;
  }
  async create(userId: string, recipeId: string): Promise<IWishlist> {
    const wishlist = wishlistModel.build({
      userId,
      recipes:[recipeId]
   })
   await wishlist.save();
   return wishlist;
  }
}
