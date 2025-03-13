export interface IOtpService{
    createOtp():Promise<void|string>
}