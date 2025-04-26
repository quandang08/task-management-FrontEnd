import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React, { useState } from "react";
import UserList from "../user/UserList";
import SubmissionsList from "./Submission/SubmissionList";
import EditTaskForm from "./EditTaskForm";
import { useDispatch, useSelector } from "react-redux";
import { completeTask, deleteTask } from "../../features/task/TaskThunk";
import { showNotification } from "../../features/notification/NotificationSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import SubmitFormModel from "./SubmitFormModel";
import { fetchSubmissionByTaskId } from "../../features/submission/SubmissionThunk";

const TaskCard = ({ task }) => {
  const formattedDate = format(new Date(task.deadline), "dd/MM/yyyy HH:mm");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  const role = auth.user?.role || "";
  const isAdmin = role === "ROLE_ADMIN";

  const [openUserList, setOpenUserList] = useState(false);
  const [openSubmissionList, setOpenSubmissionList] = useState(false);
  const [openUpdateTaskForm, setOpenUpdateTaskForm] = useState(false);
  const [openSubmitFormModel, setOpenSubmitFormModel] = useState(false);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const updateURLWithTaskId = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("taskId", task.id);
    navigate(`${location.pathname}?${updatedParams.toString()}`);
  };

  const handleOpenUserList = () => {
    updateURLWithTaskId();
    setOpenUserList(true);
    handleMenuClose();
  };

  const handleOpenSubmissionList = () => {
    updateURLWithTaskId();
    setOpenSubmissionList(true);
    handleMenuClose();
  };

  const handleOpenUpdateTaskModel = () => {
    updateURLWithTaskId();
    setOpenUpdateTaskForm(true);
    handleMenuClose();
  };

  const handleOpenSubmitFormModel = () => {
    updateURLWithTaskId();
    setOpenSubmitFormModel(true);
    handleMenuClose();
  };

  const handleDeleteTask = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(task.id));
      dispatch(showNotification({ message: "Task deleted successfully!", type: "success" }));
      handleMenuClose();
    }
  };

  const handleMarkTaskAsDone = () => {
    dispatch(completeTask({ taskId: task.id }))
      .then(() => dispatch(showNotification({ message: "Task marked as done successfully!", type: "success" })))
      .catch((error) =>
        dispatch(showNotification({ message: `Failed to mark task as done: ${error.message}`, type: "error" }))
      );
  };

  return (
    <div className="card flex flex-col lg:flex-row justify-between gap-5 p-4 rounded-xl shadow-md bg-white">
      {/* Left Part */}
      <div className="flex flex-col sm:flex-row gap-5 flex-1">
        <img
          className="w-full sm:w-[8rem] sm:h-[8rem] object-cover rounded-lg shadow-sm"
          src={task.image}
          alt="task"
        />

        <div className="flex flex-col justify-between flex-grow space-y-3">
          <div>
            <h1 className="font-bold text-lg">{task.title}</h1>
            <p className="text-gray-500 text-sm">{task.description}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-400">Created At: {formattedDate}</p>
            <p
              className={`font-semibold text-xs px-3 py-1 rounded-full ${
                task.status === "COMPLETED"
                  ? "bg-green-100 text-green-700"
                  : task.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {task.status}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {task.tags.map((tag, idx) => (
              <span
                key={idx}
                className="py-1 px-4 rounded-full bg-blue-50 text-blue-600 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Part - Menu */}
      <div className="flex justify-end">
        <IconButton onClick={handleMenuClick}>
          <MoreHorizIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          {isAdmin ? (
            <>
              <MenuItem onClick={() => console.log("Viewing details for task:", task.id)}>
                View Details
              </MenuItem>
              <MenuItem onClick={handleOpenUserList}>Assigned Users</MenuItem>
              <MenuItem onClick={handleOpenSubmissionList}>See Submissions</MenuItem>
              <MenuItem onClick={handleOpenUpdateTaskModel}>Edit Task</MenuItem>
              <MenuItem onClick={handleDeleteTask}>Delete Task</MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={handleOpenSubmitFormModel}>Submit Task</MenuItem>
              <MenuItem onClick={handleMarkTaskAsDone}>Mark as Done</MenuItem>
            </>
          )}
        </Menu>
      </div>

      {/* Modals */}
      <UserList open={openUserList} handleClose={() => setOpenUserList(false)} taskId={task.id} />
      <SubmissionsList open={openSubmissionList} handleClose={() => setOpenSubmissionList(false)} />
      <EditTaskForm
        key={task.id}
        open={openUpdateTaskForm}
        handleClose={() => setOpenUpdateTaskForm(false)}
        initialData={task}
      />
      <SubmitFormModel
        open={openSubmitFormModel}
        handleClose={() => setOpenSubmitFormModel(false)}
        taskId={task.id}
        onSuccess={() => dispatch(fetchSubmissionByTaskId(task.id))}
      />
    </div>
  );
};

export default TaskCard;
