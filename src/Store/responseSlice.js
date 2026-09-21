import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    success: false,
    status: null,
    statusText: "",
    headers: {},
    contentType: "",
    responseTime: 0,
    data: null
};

const responseSlice = createSlice({
    name: "response",
    initialState,

    reducers: {
        setResponse: (state, action) => {
            return action.payload;
        },

        clearResponse: () => {
            return initialState;
        }
    }
});

export const { setResponse, clearResponse } = responseSlice.actions;

export default responseSlice.reducer;