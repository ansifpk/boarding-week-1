import bcrypt from 'bcrypt'

export const creatHash = async(password:string)=>{
    try {
         const hashedPass = await bcrypt.hash(password,10)
         return hashedPass;
    } catch (error) {
        console.error(error)
    }
}

export const compareHash = async(password:string,hashedPassword:string)=>{
    try {
      
         const comparedPass = await bcrypt.compare(password,hashedPassword);
         console.log(password,hashedPassword);
        
         return comparedPass;
    } catch (error) {
        console.error(error)
    }
}