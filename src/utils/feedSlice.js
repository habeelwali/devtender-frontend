import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed(state, action) {
            state = action.payload;
            return state;
        },
        removeFeed(state, action) {
            console.log("action.payload",state);
            const newFeed = state.filter((card) => card._id !== action.payload);
            console.log("test");
            return newFeed
        }



    }

})
export const {addFeed, removeFeed} = feedSlice.actions
export default feedSlice.reducer;