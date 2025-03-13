import { Request, Response, NextFunction } from "express";
import { IUser } from "../../models/interfaces/IUser";
import { IUserService } from "../interfaces/IUserService";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repository/interfaces/IUserRepository";
import { BadRequestError } from "../../errors/badRequestError";
import { ITokenService } from "../interfaces/ITokenService";
import { IPasswordService } from "../interfaces/IPasswordService";
import { NotFoundError } from "../../errors/notFoundError";
import { IOtpService } from "../interfaces/IOtpService";
import { IOtpRepository } from "../../repository/interfaces/IOtpRepository";
import { ISendMailService } from "../interfaces/ISendMailService";
import { ForBiddenError } from "../../errors/ForbiddenError";


@injectable()
export class UserService implements IUserService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("OtpRepository") private otpRepository: IOtpRepository,
    @inject("TokenService") private tokenService: ITokenService,
    @inject("PasswordService") private passwordService: IPasswordService,
    @inject("OtpService") private otpService: IOtpService,
    @inject("SendEmailService") private sendEmailService: ISendMailService
  ) {}
  async loginUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | IUser> {
    try {
      const { email, password } = req.body;

      const user = await this.userRepository.findOne(email);
      if (!user) {
        throw new NotFoundError("User not found...");
      }
      let pass = await this.passwordService.compareHash(
        password,
        user.password
      );
      if (!pass) {
        throw new BadRequestError("Invalid Credentials");
      }
      const tokens = await this.tokenService.createAccessAndRefreshToken(
        user._id as string
      );
      if(tokens){
        const {accessToken,refreshToken} = tokens;
        await this.tokenService.setUpTokens(accessToken,refreshToken,res);
        return user;
      }
      
    
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  async googleAuth(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | IUser> {
   try {
    const {email,password} = req.body 
   
    const checkUser = await this.userRepository.findOne(email);
 
    if(checkUser){
      const checkPassword = await this.passwordService.compareHash(password,checkUser?.password);
      if(!checkPassword){
        throw new BadRequestError('Invalid Credentials')
      }
      const tokens = await this.tokenService.createAccessAndRefreshToken(checkUser._id as string);
      if(tokens){
        const {accessToken,refreshToken} = tokens;
        await this.tokenService.setUpTokens(accessToken,refreshToken,res);
        return checkUser;
      }
      
    }else{
       
        const createHash = await this.passwordService.creatHash(password);
        req.body.password = createHash
        const user = await this.userRepository.create(req.body);
      
      const tokens = await this.tokenService.createAccessAndRefreshToken(
        user!._id as string
      );
      if(tokens){
        const {accessToken,refreshToken} = tokens;
        await this.tokenService.setUpTokens(accessToken,refreshToken,res);
        return user;
      }
    }
   } catch (error) {
    console.error(error);
    next(error);
   }
  }
  async signUpUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | boolean> {
    try {
      const { email } = req.body;
      const user = await this.userRepository.findOne(email);
      if (user) {
        throw new BadRequestError("Email ALready Registered");
      }
      const otp = await this.otpService.createOtp();
      console.log("register otp", otp);
      await this.otpRepository.create(email, otp as string);
      await this.sendEmailService.sentEmailVerification(email, otp as string);
      
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  async checkOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<IUser | void> {
    try {
      const { otp, email, password } = req.body;
      const check = await this.otpRepository.findOne(email);
      if (!check) {
        throw new BadRequestError("OTP Expired...");
      }
      if (check.otp !== otp) {
        throw new BadRequestError("Invalid OTP");
      }
      const pass = await this.passwordService.creatHash(password);
      req.body.password = pass;
      const user = await this.userRepository.create(req.body);
      await this.otpRepository.deleteOne(email)
      const tokens = await this.tokenService.createAccessAndRefreshToken(
        user!._id as string
      );
      if(tokens){
        const {accessToken,refreshToken} = tokens;
        await this.tokenService.setUpTokens(accessToken,refreshToken,res);
        return user;
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  async resentOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | boolean> {
    try {
      const { email } = req.body;
      const otp = await this.otpService.createOtp();
      console.log("resend otp", otp);
      await this.otpRepository.create(email, otp as string);
      await this.sendEmailService.sentEmailVerification(email, otp as string);
    
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  async refreshTocken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | { accessToken: string; refreshToken: string }> {
    try {
      const refreshToken = req.cookies?.refreshToken;
      const { userId } = req.params;

      if (!refreshToken) {
        throw new ForBiddenError();
      }
      const checkToken = await this.tokenService.verifyRefreshToken(
        refreshToken
      );

      if (!checkToken) {
        throw new ForBiddenError();
      }

      const tokens = await this.tokenService.createAccessAndRefreshToken(
        userId
      );
      if(tokens){
        const {accessToken,refreshToken} = tokens;
        await this.tokenService.setUpTokens(accessToken,refreshToken,res);
      }

    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  async signOutUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | boolean> {
    try {
      res.cookie("accessToken", "", { expires: new Date(0) });
      res.cookie("refreshToken", "", { expires: new Date(0) });
      
    } catch (error) {
      console.error(error);
      next(error)
    }
  }
}
