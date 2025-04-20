import * as React from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Grid,
  Button,
  Autocomplete,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState, useEffect } from "react";
import "./CreateTask/CreateTaskForm.css";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../features/task/TaskThunk";
import { toast } from "react-toastify";

export default function EditTaskForm({ open, handleClose, initialData }) {
  const dispatch = useDispatch();
  const { task } = useSelector((store) => store);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    tags: [],
    deadline: new Date(),
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        image: initialData.image || "",
        description: initialData.description || "",
        tags: initialData.tags || [],
        deadline: initialData.deadline
          ? new Date(initialData.deadline)
          : new Date(),
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (task.taskDetails) {
      setFormData({
        ...task.taskDetails,
        deadline: new Date(task.taskDetails.deadline),
      });
    }
  }, [task.taskDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      deadline: formData.deadline.toISOString(),
    };

    try {
      await dispatch(
        updateTask({ taskId: initialData.id, taskData: payload })
      ).unwrap();
      toast.success("Task updated successfully!");
      handleClose();
    } catch (error) {
      console.error("Update task failed: ", error);
      toast.error(error.message || "Failed to update task!");
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      tags: newValue,
    }));
  };

  const handleDeadlineChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      deadline: date,
    }));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="createTaskModalBox">
        <Typography variant="h6" className="createTaskTitle">
          EDIT TASK
        </Typography>

        <form onSubmit={handleSubmit} className="createTaskForm">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                variant="outlined"
                className="createTaskField"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Image URL"
                fullWidth
                name="image"
                value={formData.image}
                onChange={handleChange}
                variant="outlined"
                className="createTaskField"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                variant="outlined"
                className="createTaskField"
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="task-tags"
                options={[
                  "Urgent",
                  "Bug",
                  "Feature",
                  "Low Priority",
                  "Improvement",
                ]}
                value={formData.tags}
                onChange={handleTagChange}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tags"
                    placeholder="Select tags"
                    variant="outlined"
                    className="createTaskField"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Deadline"
                  value={formData.deadline}
                  onChange={handleDeadlineChange}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      variant="outlined"
                      className="createTaskField"
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} className="createTaskForm__actions">
              <Button variant="outlined" color="error" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  bgcolor: "#000",
                  ":hover": { bgcolor: "#333" },
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}
