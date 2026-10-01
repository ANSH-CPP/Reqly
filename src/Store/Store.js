import { configureStore } from "@reduxjs/toolkit";
import responseReducer from "./responseSlice";
import historyReducer from "./historySlice";
import authReducer from "./authSlice";

const store = configureStore({
    reducer: {
        response: responseReducer,
        history: historyReducer,
        auth: authReducer
    }
});

export default store;