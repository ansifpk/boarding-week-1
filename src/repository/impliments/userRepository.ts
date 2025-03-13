import { IUser } from "../../models/interfaces/IUser";
import { userModel } from "../../models/userModel";
import { IUserRepository } from "../interfaces/IUserRepository";

export class UserRepository implements IUserRepository{
    async findOne(email: string): Promise<IUser | null> {
        const user = await userModel.findOne({email:email});
        return user;
    }
    async create(data: IUser): Promise<IUser> {
        const user = userModel.build(data);
        await user.save();
        return user;
    }
    
}