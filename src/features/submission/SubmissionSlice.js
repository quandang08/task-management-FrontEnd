import { createSlice } from "@reduxjs/toolkit";
import {
  submitTask,
  fetchAllSubmissions,
  fetchSubmissionByTaskId,
  acceptOrDeclineSubmission,
} from "./SubmissionThunk";

const initialState = {
  submissions: [],
  loading: false, 
  error: null,
  successMessage: null,
};

const submissionSlice = createSlice({
  name: "submissions",
  initialState,
  reducers: {
    clearSubmissionError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // Submit Task
    builder
      .addCase(submitTask.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(submitTask.fulfilled, (state, action) => {
        state.loading = false;
        state.submissions.push(action.payload);
        state.successMessage = "Task submitted successfully";
      })
      .addCase(submitTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Fetch All Submissions
    builder
      .addCase(fetchAllSubmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSubmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.submissions = action.payload;
      })
      .addCase(fetchAllSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Fetch Submissions By Task ID
    builder
      .addCase(fetchSubmissionByTaskId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubmissionByTaskId.fulfilled, (state, action) => {
        state.loading = false;
        state.submissions = action.payload;
      })
      .addCase(fetchSubmissionByTaskId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Accept or Decline Submission
    builder
      .addCase(acceptOrDeclineSubmission.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(acceptOrDeclineSubmission.fulfilled, (state, action) => {
        state.loading = false;
        // Cập nhật submission đã thay đổi
        state.submissions = state.submissions.map((s) =>
          s.id === action.payload.id ? action.payload : s
        );
        state.successMessage = "Submission status updated successfully";
      })
      .addCase(acceptOrDeclineSubmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSubmissionError, clearSuccessMessage } = submissionSlice.actions;
export default submissionSlice.reducer;
