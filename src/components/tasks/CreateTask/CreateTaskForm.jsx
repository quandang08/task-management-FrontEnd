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
import { useState } from "react";
import "./CreateTaskForm.css";
import { useDispatch } from "react-redux";
import { createTask } from "../../../features/task/TaskThunk";
import { TAG_OPTIONS } from "../constants.js";

export default function CreateTaskForm({ handleClose, open }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    tags: [],
    deadline: new Date(),
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      deadline: formData.deadline.toISOString(), 
    };
    console.log("Payload gửi lên:", payload);
    dispatch(createTask(formData));
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="createTaskModalBox">
        <Typography variant="h6" className="createTaskTitle">
          CREATE NEW TASK
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
                options={TAG_OPTIONS}
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
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}
