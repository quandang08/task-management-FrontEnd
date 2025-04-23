import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../../api/api";

export const submitTask = createAsyncThunk(
  "submissions/submitTask",
  async ({ taskId, githubLink }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);

    try {
      const response = await api.post("/api/submissions", {
        taskId,
        githubLink,
      });
      console.log("Submission success", response.data);
      return response.data;
    } catch (error) {
      console.log("Submission error", error);
      throw new Error(error?.response?.data?.error || "Submit failed");
    }
  }
);

export const fetchAllSubmissions = createAsyncThunk(
  "submissions/fetchAllSubmissions",
  async () => {
    setAuthHeader(localStorage.getItem("jwt"));
    try {
      const { data } = await api.get(`/api/submissions`);
      console.log("submission task");
      return data;
    } catch (error) {
      console.log("error", error);
      throw new Error(error.response.data.error);
    }
  }
);

export const fetchSubmissionByTaskId = createAsyncThunk(
  "submissions/fetchSubmissionByTaskId",
  async (taskId) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
      const { data } = await api.get(`/api/submissions/task/${taskId}`);
      console.log("Fetched task submissions");
      return data;
    } catch (error) {
      console.error("Error fetching submission by ID:", error);
      throw new Error(error.response?.data?.error || error.message);
    }
  }
);

export const acceptOrDeclineSubmission = createAsyncThunk(
  "submissions/acceptOrDeclineSubmission",
  async ({ id, status }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
      const { data } = await api.put(`/api/submissions/${id}`, null, {
        params: { status },
      });
      console.log("Updated submission status");
      return data;
    } catch (error) {
      console.error("Error updating submission status:", error);
      throw new Error(error.response?.data?.error || error.message);
    }
  }
);
