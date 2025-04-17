import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../../api/api";

export const login = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`/auth/singin`, userData);
    localStorage.setItem("jwt", data.jwt);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || "Login failed");
  }
});

export const register = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`/auth/singup`, userData);
    localStorage.setItem("jwt", data.jwt);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || "Register failed");
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem('jwt');
  return { message: "Logged out" };
});

export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("jwt");
    setAuthHeader(token, api);
    try {
      const { data } = await api.get(`/api/users/profile`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Get profile failed");
    }
  }
);

export const getUserList = createAsyncThunk(
  "auth/getUserList",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("jwt");
    setAuthHeader(token, api);
    try {
      const { data } = await api.get(`/api/users`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Get user list failed");
    }
  }
);