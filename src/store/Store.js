import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import authReducer from "../features/auth/AuthSlice";
import taskReducer  from "../features/task/TaskSlice";
import submissionReducer from "../features/submission/SubmissionSlice";
import notificationReducer from "../features/notification/NotificationSlice";

const rootReducer = combineReducers({
    auth:authReducer,
    task:taskReducer,
    submission:submissionReducer,
    notification: notificationReducer,
})

const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(thunk)
})

export default store;