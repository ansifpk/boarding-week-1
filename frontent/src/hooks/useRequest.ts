import { client } from "@/service/client";
import axios, { AxiosError, AxiosStatic } from "axios";
import { JSX, useState } from "react";
import ErrorsComp from '../components/ErrorsComp'
export default ({url,method,body,onSuccess}:{
    url: string; 
    method:  "get" | "post" | "put" | "delete"; 
    body: object; 
    onSuccess: () => void
 }) => {
    const [errors,setError] = useState<null|{message:string}[]>(null)

    const doRequest =  async() => {
      try {
       setError(null)
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