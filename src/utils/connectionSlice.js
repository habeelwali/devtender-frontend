import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connection",
    initialState: null,
    reducers: {
        setConnections(state, action) {
            state= action.payload
            return state
        }
    }
})
export const {setConnections} = connectionSlice.actions;
export default connectionSlice.reducer;