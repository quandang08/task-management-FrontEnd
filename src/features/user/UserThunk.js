import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../../api/api";

// Thunk để lấy thông tin chi tiết người dùng
export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async ({ userId }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);

    try {
      const { data } = await api.get(`/api/user-details/${userId}`);

      return data;
    } catch (error) {
      console.log("Error: ", error);

      throw new Error(
        error?.response?.data?.error || "Đã có lỗi xảy ra khi tải dữ liệu"
      );
    }
  }
);

// Thunk để cập nhật thông tin người dùng
export const updateUserDetails = createAsyncThunk(
  "user/updateUserDetails",
  async ({ userId, userDetails }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);

    try {
      const { data } = await api.put(
        `/api/user-details/${userId}`,
        userDetails
      );

      return data;
    } catch (error) {
      console.log("Error: ", error);
      throw new Error(
        error?.response?.data?.error || "Đã có lỗi xảy ra khi cập nhật dữ liệu"
      );
    }
  }
);
