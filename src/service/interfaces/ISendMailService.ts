export interface ISendMailService{
    sentEmailVerification(email: string, otp: string):Promise<void>
}