import axios from "axios";

const client = axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    headers:{
        "Content-Type": 'application/json',
    },
    withCredentials:true
});

export {client}