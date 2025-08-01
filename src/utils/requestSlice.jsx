import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:'request',
    initialState:null,
    reducers:{
        addRequests:(state,action)=>{return action.payload},
        removeRequests:(state,action)=>{
            const newArray = state.filter((r)=>r._id !== action.payload) //here i am updating requests array once the request is accepted or rejected i am filtering out that the request should not be equal to or present in new array
            return newArray;
         }
    }
})
export const {addRequests,removeRequests} = requestSlice.actions;
export default requestSlice.reducer;