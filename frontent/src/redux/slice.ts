import { createSlice } from "@reduxjs/toolkit";
interface IUser{
    _id:string,
    email:string,
    name:string
}

const initialState:IUser = {
    _id: "",
    email: "",
    name: ""
}
const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        setUser:(state,action)=>{
          state._id=action.payload._id;
          state.email=action.payload.email;
          state.name=action.payload.name;
        },
        currentUser:(state)=>{
          return state
        },
        removeUser:(state)=>{
            state._id='';
            state.email='';
            state.name='';
        }
    }
})

export const {setUser,removeUser,currentUser} = authSlice.actions

export default authSlice.reducer