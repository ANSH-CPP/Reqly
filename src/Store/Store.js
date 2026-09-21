import { configureStore } from "@reduxjs/toolkit";
import responseReducer from "./responseSlice";
import historyReducer from "./historySlice"
export const store = configureStore({
    reducer: {
        response: responseReducer,
        history: historyReducer
    }
});