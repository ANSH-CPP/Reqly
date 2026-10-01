import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    history: [],
    selectedRequest: null
};

const historySlice = createSlice({
    name: "history",

    initialState,

    reducers: {

        addHistory: (state, action) => {
            state.history.push(action.payload);
        },

        setHistory: (state, action) => {
            state.history = action.payload;
        },

        removeHistory: (state, action) => {
            state.history = state.history.filter(
                (item) => item.$id !== action.payload
            );
        },

        clearHistory: (state) => {
            state.history = [];
        },

        setSelectedRequest: (state, action) => {
            state.selectedRequest = action.payload;
        },

        clearSelectedRequest: (state) => {
            state.selectedRequest = null;
        }

    }
});

export const {
    addHistory,
    setHistory,
    removeHistory,
    clearHistory,
    setSelectedRequest,
    clearSelectedRequest
} = historySlice.actions;

export default historySlice.reducer;