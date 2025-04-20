import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  message: null,
  type: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      const { message, type } = action.payload;
      state.message = message;
      state.type = type;
      toast[type](message);
    },
  },
});

export const { showNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
