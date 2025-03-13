import { IUser } from "../../models/interfaces/IUser";

export interface IUserRepository{
    findOne(email:string):Promise<IUser|null>
    create(data:IUser):Promise<IUser>
}