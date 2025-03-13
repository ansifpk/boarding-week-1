import { Router } from "express";
import { IRoutes } from "../interface/IRoutes";
import { inject, injectable } from "tsyringe";
import "reflect-metadata";
import { IUserController } from "../../controller/interface/IuserControllerInterface";

@injectable()
export class UserRoutes implements IRoutes {
  public router = Router();
  constructor(
    @inject("UserController") private userController: IUserController
  ) {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post('/signIn',
        this.userController.loginUser.bind(this.userController)
    );
    this.router.post(
      "/googleAuth",
      this.userController.googleAuth.bind(this.userController)
    );
    this.router.post(
      "/signUp",

      this.userController.signUpUser.bind(this.userController)
    );
    this.router.post(
      "/refresh-token/:userId",
      this.userController.refreshTocken.bind(this.userController)
    );
    this.router.post(
      "/otp",
      this.userController.checkOtp.bind(this.userController)
    );
    this.router.post(
      "/resentOtp",
      this.userController.resentOtp.bind(this.userController)
    );
    this.router.post(
      "/signOut",
      this.userController.signOutUser.bind(this.userController)
    );
  }
}
