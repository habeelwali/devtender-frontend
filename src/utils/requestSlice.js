import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        getRequest(state, action) {
            
            state = action.payload;
            return state;
        },
        removeRequest(state, action) {
            console.log("action.payload",state);
            const newFeed = state.filter((state) => state._id !== action.payload);
            console.log("test");
            return newFeed
        }
    }

})
export const {getRequest, removeRequest} = requestSlice.actions
export default requestSlice.reducer;