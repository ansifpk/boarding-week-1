import jwt from "jsonwebtoken";
import { paylod } from "../../models/interfaces/ITockens";
import { ITokenService } from "../interfaces/ITokenService";
import { Response } from "express";

export class TokenService implements ITokenService {
  async createAccessAndRefreshToken(
    _id: string
  ): Promise<{ accessToken: string; refreshToken: string } | void> {
    try {
      const accessToken = jwt.sign({ _id }, process.env.JWT_ACCESS_SECRET!, {
        expiresIn: "15m",
      });
      const refreshToken = jwt.sign({ _id }, process.env.JWT_REFRESH_SECRET!, {
        expiresIn: "30d",
      });
      return { accessToken, refreshToken };
    } catch (error) {
      console.error(error);
    }
  }
  async verifyAccessToken(userId: string): Promise<paylod | void> {
    try {
      const accessTocken = jwt.verify(
        userId,
        process.env.JWT_ACCESS_SECRET!
      ) as paylod;
      return accessTocken;
    } catch (error) {
      console.error(error);
    }
  }
  async verifyRefreshToken(userId: string): Promise<paylod | void> {
    try {
      const refreshToken = jwt.verify(
        userId,
        process.env.JWT_REFRESH_SECRET!
      ) as paylod;
      return refreshToken;
    } catch (error) {
      console.error(error);
    }
  }
  async setUpTokens(
    accessToken: string,
    refreshToken: string,
    res: Response
  ): Promise<void> {
    try {
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "none",
        maxAge: eval(process.env.ACCESS_TOKEN_MAX_AGE as string),
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "none",
        maxAge: eval(process.env.REFRESH_TOKEN_MAX_AGE as string),
      });
    } catch (error) {
      console.error(error);
    }
  }
}
