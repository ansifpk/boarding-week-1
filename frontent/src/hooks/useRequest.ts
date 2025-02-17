import { client } from "@/service/client";
import {  useState } from "react";

export default ({url,method,body,onSuccess}:{
    url: string; 
    method:  "get" | "post" | "put" | "delete" | "patch"; 
    body: object; 
    onSuccess: () => void
 }) => {
    const [errors,setError] = useState<null|{message:string}[]>(null)
   
    const doRequest =  async(data?:object) => {
      try {
       setError(null)

         if(method !== "get"){
          body = data!
         }
         const response = await client[method](url,body)
         if(onSuccess){
           onSuccess()
         }
         return response.data;
      } catch (err:any) {
        setError(err.response.data.errors)
      }
   }
    return {doRequest,errors};
}