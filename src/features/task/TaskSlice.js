import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTasks,
  fetchUsersTasks,
  fetchTaskById,
  createTask,
  updateTask,
  deleteTask,
  assignTaskToUser,
  completeTask,
  updateTaskStatus,
} from "./TaskThunk";

const initialState = {
  tasks: [],               // Danh sách task
  taskDetails: null,       // Chi tiết task khi xem hoặc sửa
  loading: false,          // Loading chung cho mọi hành động
  error: null,             // Lỗi chung
  successMessage: null,    // Thông báo thành công
  usersTask: [],           // Danh sách task của user
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    clearTaskError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all tasks
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Fetching tasks...");
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        console.log("Fetched tasks successfully:", action.payload);

      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || action.error?.toString() || "Đã có lỗi xảy ra";
        console.error("Error fetching tasks:", action.error);
      })

      // Fetch user-specific tasks
      .addCase(fetchUsersTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchUsersTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch task by ID
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTask = action.payload || null;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create a new task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.unshift(action.payload);
        state.successMessage = "Tạo task thành công";
        console.log("Task created successfully:", action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        );
        state.selectedTask = action.payload;
        state.successMessage = "Cập nhật task thành công";
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
        state.successMessage = action.payload.message || "Xóa task thành công";
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Assign task to user
      .addCase(assignTaskToUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(assignTaskToUser.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        );
        state.successMessage = "Giao task thành công";
      })
      .addCase(assignTaskToUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Complete task
      .addCase(completeTask.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, status: 'COMPLETED' } : t
        );
        state.successMessage = action.payload.message;
      })
      .addCase(completeTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update task status
      .addCase(updateTaskStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map((t) =>
          t.id === action.payload.id
            ? { ...t, status: action.payload.status || t.status }
            : t
        );
        state.successMessage = action.payload.message;
      })
      .addCase(updateTaskStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearTaskError, clearSuccessMessage } = taskSlice.actions;
export default taskSlice.reducer;
