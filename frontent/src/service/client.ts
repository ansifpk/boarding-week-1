import axios from "axios";
import { userRoute } from "./endPoints";
import { store } from "@/redux/store";
import { removeUser } from "@/redux/slice";


const client = axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    headers:{
        "Content-Type": 'application/json',
    },
    withCredentials:true
});

client.interceptors.response.use(
    response => response,
    async function (error) {
        const originalRequest = error.config;
      
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const user = store.getState();
                console.log("ji");
                
                await client.post(`${userRoute.refreshTocken}/${user._id}`,{},{withCredentials:true})
                return client(originalRequest);
            } catch (err) {
   
                store.dispatch(removeUser())
                return Promise.reject(err);
            }
        }
        
        store.dispatch(removeUser())
        return Promise.reject(error);
    }
  );
  

export {client}