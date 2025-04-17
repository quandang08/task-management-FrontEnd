import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../../api/api";


// Fetch tasks
export const fetchTasks = createAsyncThunk("task/fetchTasks", async ({ status }) => {
    setAuthHeader(localStorage.getItem("jwt"));

    try {
        const { data } = await api.get("/api/tasks", {
            params: { status }
        });
        console.log("fetch tasks: ", data);
        return data;
    } catch (error) {
        console.log("error ", error);
        throw Error(error?.response?.data?.error || "An error occurred");
    }
});

// Fetch user's tasks
export const fetchUsersTasks = createAsyncThunk("task/fetchUsersTasks", async ({ status }) => {
    setAuthHeader(localStorage.getItem("jwt"));

    try {
        const { data } = await api.get("/api/tasks/user", {
            params: { status }
        });
        console.log("fetch tasks: ", data);
        return data;
    } catch (error) {
        console.log("error ", error);
        throw Error(error?.response?.data?.error || "An error occurred");
    }
});

// Fetch task by ID
export const fetchTaskById = createAsyncThunk("task/fetchTaskById", async ({ taskId }) => {
    setAuthHeader(localStorage.getItem("jwt"));

    try {
        const { data } = await api.get(`/api/tasks/${taskId}`);
        console.log("fetch task: ", data);
        return data;
    } catch (error) {
        console.log("error ", error);
        throw Error(error?.response?.data?.error || "An error occurred");
    }
});

// Create Task
export const createTask = createAsyncThunk("task/createTask", async (taskData) => {
    setAuthHeader(localStorage.getItem("jwt"));

    try {
        const { data } = await api.post("/api/tasks", taskData);
        return data;
    } catch (error) {
        console.log("create task error", error);
        throw Error(error?.response?.data?.error || "An error occurred");
    }
});

// Update Task
export const updateTask = createAsyncThunk("task/updateTask", async ({ taskId, taskData }) => {
    setAuthHeader(localStorage.getItem("jwt"));

    try {
        const { data } = await api.put(`/api/tasks/${taskId}`, taskData);
        return data;
    } catch (error) {
        console.log("update task error", error);
        throw Error(error?.response?.data?.error || "An error occurred");
    }
});

// Delete Task
export const deleteTask = createAsyncThunk("task/deleteTask", async ({ taskId }) => {
    setAuthHeader(localStorage.getItem("jwt"));

    try {
        const { data } = await api.delete(`/api/tasks/${taskId}`);
        return { id: taskId, message: data };
    } catch (error) {
        console.log("delete task error", error);
        throw Error(error?.response?.data?.error || "An error occurred");
    }
});

// Assign Task to User
export const assignTaskToUser = createAsyncThunk("task/assignTaskToUser", async ({ taskId, userId }) => {
    setAuthHeader(localStorage.getItem("jwt"));

    try {
        const { data } = await api.put(`/api/tasks/${taskId}/user/${userId}/assigned`);
        return data;
    } catch (error) {
        console.log("assign task error", error);
        throw Error(error?.response?.data?.error || "An error occurred");
    }
});

// Complete Task
export const completeTask = createAsyncThunk("task/completeTask", async ({ taskId }) => {
    setAuthHeader(localStorage.getItem("jwt"));

    try {
        const { data } = await api.put(`/api/tasks/${taskId}/complete`);
        return { id: taskId, message: data.message };
    } catch (error) {
        console.log("complete task error", error);
        throw Error(error?.response?.data?.error || "An error occurred");
    }
});

// Update Task Status
export const updateTaskStatus = createAsyncThunk("task/updateTaskStatus", async ({ taskId, status }) => {
    setAuthHeader(localStorage.getItem("jwt"));

    try {
        const { data } = await api.put(`/api/tasks/${taskId}/status`, null, {
            params: { status }
        });
        return { id: taskId, message: data.message };
    } catch (error) {
        console.log("update status error", error);
        throw Error(error?.response?.data?.error || "An error occurred");
    }
});