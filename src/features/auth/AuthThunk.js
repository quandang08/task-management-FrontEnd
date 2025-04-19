import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../../api/api";
import { BASE_URL } from "../../api/api";
import axios from "axios";

// LOGIN
export const login = createAsyncThunk("auth/login", async (userData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/signin`, userData);
    localStorage.setItem("jwt", data.jwt); // Lưu JWT vào localStorage
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(error.response?.data?.error || "Đăng nhập không thành công.");
  }
});

// REGISTER
export const register = createAsyncThunk("auth/register", async (userData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/signup`, userData);
    return {
      message: "Đăng ký thành công. Vui lòng đăng nhập",
      user: data.user,
    };
  } catch (error) {
    console.error("Register error:", error);
    throw new Error(error.response?.data?.error || "Đăng ký không thành công.");
  }
});

// LOGOUT
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    localStorage.removeItem("jwt"); // Xóa JWT khỏi localStorage
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("Lỗi khi đăng xuất.");
  }
});

// GET USER PROFILE
export const getUserProfile = createAsyncThunk("auth/getUserProfile", async (jwt) => {
  setAuthHeader(jwt, api); // Thiết lập header với JWT
  try {
    const { data } = await api.get("/api/users/profile");
    return data;
  } catch (error) {
    console.error("Get user profile error:", error);
    throw new Error(error.response?.data?.error || "Lỗi khi lấy thông tin người dùng.");
  }
});

// GET USER LIST
export const getUserList = createAsyncThunk("auth/getUserList", async (jwt) => {
  setAuthHeader(jwt, api); // Thiết lập header với JWT
  try {
    const { data } = await api.get("/api/users");
    return data;
  } catch (error) {
    console.error("Get user list error:", error);
    throw new Error(error.response?.data?.error || "Lỗi khi lấy danh sách người dùng.");
  }
});
