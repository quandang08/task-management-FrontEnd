import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { submitTask } from "../../features/submission/SubmissionThunk";
import { Button, Modal, TextField, Box } from "@mui/material";

const SubmitFormModel = ({ open, handleClose, taskId }) => {
  const dispatch = useDispatch();
  const [githubLink, setGithubLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!githubLink.trim()) {
      alert("Please enter a GitHub link.");
      return;
    }

    try {
      await dispatch(submitTask({ taskId, githubLink }));
      alert("Submitted successfully!");
      handleClose();
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Submit Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="GitHub Link"
            fullWidth
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2">
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default SubmitFormModel;
