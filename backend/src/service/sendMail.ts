import nodeMailer from 'nodemailer';
export async function sentEmailVerification( email: string, otp: string){
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
      
        auth: {
            user: 'pkansif39@gmail.com',
            pass: 'tvtq zgcc skhn rliu'
        }
        
});
const sentVerificationEmail = async (toEmail:string,otp:string)=>{
    //  mail options
    try {
const mailOptions = {
   from: 'pkansif39@gmail.com',
   to: toEmail,
   subject: "Verify Your email",
   html: `Your OTP is: ${otp}`
};
const info = await transporter.sendMail(mailOptions);

} catch (error) {
console.error('Error sending email:',error)
return error
}
}
await   sentVerificationEmail(email,otp);
}