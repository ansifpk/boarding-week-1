import { container } from "tsyringe";
import { UserRoutes } from "../router/impliments/userRouters";
import { UserController } from "../controller/implimentation/userController";
import { UserService } from "../service/implimentation/userService";
import { UserRepository } from "../repository/impliments/userRepository";
import { OtpRepository } from "../repository/impliments/otpRepository";
import { TokenService } from "../service/implimentation/TokenService";
import { PasswordService } from "../service/implimentation/passwordService";
import { OtpService } from "../service/implimentation/otpService";
import { SendEmailService } from "../service/implimentation/emailService";
import { WishlistRoutes } from "../router/impliments/wishlistRoutes";
import { WishlistController } from "../controller/implimentation/wishlistController";
import { WishlistService } from "../service/implimentation/wishlistService";
import { WIshlistRepository } from "../repository/impliments/wishlistRepository";
import { Middleware } from "../middlewares/auth";

container.register("UserRoutes",{useClass:UserRoutes});
container.register("WishlistRoutes",{useClass:WishlistRoutes});
//controller
container.register("UserController",{useClass:UserController})
container.register("WishlistController",{useClass:WishlistController})
//services
container.register("UserService",{useClass:UserService})
container.register("WishlistService",{useClass:WishlistService})
//repository
container.register("UserRepository",{useClass:UserRepository})
container.register("WishlistRepository",{useClass:WIshlistRepository})
container.register("OtpRepository",{useClass:OtpRepository})
container.register("TokenService",{useClass:TokenService})
container.register("PasswordService",{useClass:PasswordService})
container.register("OtpService",{useClass:OtpService})
container.register("SendEmailService",{useClass:SendEmailService})
//middlewares
container.register("Middleware",{useClass:Middleware})

export default container;