import bcrypt from "bcrypt";
import { IPasswordService } from "../interfaces/IPasswordService";

export class PasswordService implements IPasswordService {
  async creatHash(password: string): Promise<void | string> {
    try {
      const hashedPass = await bcrypt.hash(password, 10);
      return hashedPass;
    } catch (error) {
      console.error(error);
    }
  }
  async compareHash(
    password: string,
    hashedPassword: string
  ): Promise<void | boolean> {
    try {
      const comparedPass = await bcrypt.compare(password, hashedPassword);
      console.log(password, hashedPassword);

      return comparedPass;
    } catch (error) {
      console.error(error);
    }
  }
}
