export function createOtp(){
    const numericChars = '0123456789'
    let otp =''
    for(let i=0;i<6;i++){
        const randomIndex = Math.floor(Math.random()* numericChars.length);
        otp += numericChars[randomIndex]
    }
    return otp
}
