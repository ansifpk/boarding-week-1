export interface IPasswordService{
    creatHash(password:string):Promise<void|string>
    compareHash(password:string,hashedPassword:string):Promise<void|boolean>
}