import { client } from "@/service/client"
import { userRoute } from "@/service/endPoints"


export const signIn = async(email:string,password:string) => {
    try {
         const res = await client.post(userRoute.signIn,{email,password})
         return res.data
    } catch (error) {
        console.error(error)
    }
}
export const signUp = async(email:string,name:string,password:string) => {
    try {
         const res = await client.post(userRoute.signUp,{email,name,password})
         return res.data
    } catch (error) {
        console.error(error)
    }
}
export const signOut = async(email:string,password:string) => {
    try {
         const res = await client.post(userRoute.signOut,{email,password})
         return res.data
    } catch (error) {
        console.error(error)
    }
}