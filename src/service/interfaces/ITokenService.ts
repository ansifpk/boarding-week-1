import { Response } from "express"
import { paylod } from "../../models/interfaces/ITockens"

export interface ITokenService{
    createAccessAndRefreshToken(_id:string):Promise<{accessToken:string,refreshToken:string}|void> 
    verifyAccessToken(_id:string):Promise<paylod|void> 
    verifyRefreshToken(_id:string):Promise<paylod|void>
    setUpTokens(accessToken:string,refreshToken:string,res:Response): Promise<void> 
}