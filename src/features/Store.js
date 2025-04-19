import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import authReducer from "./auth/AuthSlice";
import taskReducer  from "./task/TaskSlice";
import submissionReducer from "./submission/SubmissionSlice";

const rootReducer = combineReducers({
    auth:authReducer,
    task:taskReducer,
    submission:submissionReducer
})

const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(thunk)
})

export default store;