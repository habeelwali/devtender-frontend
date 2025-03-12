import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:null,
    reducers:{
        loginUser:(state,action)=>{
            state = action.payload;
            return state;
        },
        logoutUser:(state,action)=>{
            state = null;
            return state;
        }
    }
})
export const {loginUser,logoutUser} = userSlice.actions;
export default userSlice.reducer;