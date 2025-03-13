import nodeMailer from "nodemailer";
import { ISendMailService } from "../interfaces/ISendMailService";

export class SendEmailService implements ISendMailService{
    async sentEmailVerification(email: string, otp: string): Promise<void> {
        let transporter = nodeMailer.createTransport({
            service: "gmail",
        
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD,
            },
          });
          const sentVerificationEmail = async (toEmail: string, otp: string) => {
            //  mail options
            try {
              const mailOptions = {
                from: process.env.EMAIL,
                to: toEmail,
                subject: "Verify Your email",
                html: `Your OTP is: ${otp}`,
              };
              const info = await transporter.sendMail(mailOptions);
              
            } catch (error) {
              console.error("Error sending email:", error);
              return error;
            }
          };
          await sentVerificationEmail(email, otp);
    }
    
}