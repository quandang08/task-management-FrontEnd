import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../api/api";

export const fetchTasks = createAsyncThunk("task/fetchTasks", 
    async({status})=>{
        setAuthHeader(localStorage.getItem("jwt", api))

        try {
            const {data} = await api.get("/api/tasks",{
                params:{status}
            });
            console.log("fetch tasks: ", data)
            return data;
        } catch (error) {
            console.log("error ",error)
            throw Error(error.response.data.error)
        }
    }
)