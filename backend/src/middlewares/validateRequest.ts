import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ValidateRequestError } from "../errors/validateRequestError";

export const ValidateRequest = (req:Request,res:Response,next:NextFunction)=>{
  const err = validationResult(req)
  if(!err.isEmpty()){
     throw new ValidateRequestError(err.array()); 
  }
  next()
}