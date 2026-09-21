import { createSlice } from "@reduxjs/toolkit";
// import { clearHistory } from "../Appwrite/HistoryService";

const initialState = {
    history: []
};

const historySlice = createSlice({
    name: "history",

    initialState,

    reducers: {
        addHistory: (state, action) => {
            state.history.push(action.payload);
        },

        setHistory: (state,action) => {
            state.history = action.payload
        },

        removeHistory: (state,action) => {
            state.history = state.history.filter(
                (item) => item.$id !== action.payload
            );
        },
        
        clearHistory: (state) => {
            state.history = [];
        }

    }
});

export const { addHistory, setHistory, removeHistory, clearHistory } = historySlice.actions;

export default historySlice.reducer;