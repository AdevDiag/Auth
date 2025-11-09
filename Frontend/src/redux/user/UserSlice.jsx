import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null
};

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers: {
        loginUser:(state,action)=>{
            state.currentUser=action.payload;
        }
    }
});

export const {loginUser}=userSlice.actions
export default userSlice.reducer;