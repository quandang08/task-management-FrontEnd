import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../api/api";

export const login = createAsyncThunk("auth/login", async (userData) => {
    try {
        const { data } = await api.post(`/auth/singin`, userData);
        localStorage.setItem("jwt", data.jwt);
        return data;
    } catch (error) {
        throw Error(error.response?.data?.error || "Login failed");
    }
});

export const register = createAsyncThunk("auth/register", async (userData) => {
    try {
        const { data } = await api.post(`/auth/singup`, userData);
        localStorage.setItem("jwt", data.jwt);
        return data;
    } catch (error) {
        throw Error(error.response?.data?.error || "Register failed");
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    localStorage.clear();
});

export const getUserProfile = createAsyncThunk("auth/getUserProfile", async (jwt) => {
    setAuthHeader(jwt, api);
    try {
        const { data } = await api.get(`/api/users/profile`);
        return data;
    } catch (error) {
        throw Error(error.response?.data?.error || "Get profile failed");
    }
});

export const getUserList = createAsyncThunk("auth/getUserList", async (jwt) => {
    setAuthHeader(jwt, api);
    try {
        const { data } = await api.get(`/api/users`);
        return data;
    } catch (error) {
        throw Error(error.response?.data?.error || "Get user list failed");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loggedIn: false,
        loading: false,
        error: null,
        jwt: localStorage.getItem("jwt") || null,
        users: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.jwt = action.payload.jwt;
                state.loggedIn = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // REGISTER
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.loggedIn = true;
                state.jwt = action.payload.jwt;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // GET USER PROFILE
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.loggedIn = true;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // GET USER LIST
            .addCase(getUserList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserList.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getUserList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // LOGOUT
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.jwt = null;
                state.loggedIn = false;
                state.users = [];
            });
    },
});

export default authSlice.reducer;
