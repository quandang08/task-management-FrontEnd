import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React, { useState } from "react";
import UserList from "../user/UserList";
import SubmissionsList from "./SubmissionList";
import EditTaskForm from "./EditTaskForm";
import { useDispatch, useSelector } from "react-redux";
import { completeTask, deleteTask } from "../../features/task/TaskThunk";
import { showNotification } from "../../features/notification/NotificationSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import SubmitFormModel from "./SubmitFormModel";

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

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenUserList = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("taskId", task.id);
    navigate(`${location.pathname}?${updatedParams.toString()}`);
    setOpenUserList(true);
    handleMenuClose();
  };

  const handleCloseUserList = () => {
    setOpenUserList(false);
  };

  const handleOpenSubmissionList = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("taskId", task.id);
    navigate(`${location.pathname}?${updatedParams.toString()}`);
    setOpenSubmissionList(true);
    handleMenuClose();
  };

  const handleCloseSubmissionList = () => {
    setOpenSubmissionList(false);
  };

  const handleOpenUpdateTaskModel = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("taskId", task.id);
    navigate(`${location.pathname}?${updatedParams.toString()}`);
    setOpenUpdateTaskForm(true);
    handleMenuClose();
  };

  const handleCloseUpdateTaskForm = () => {
    setOpenUpdateTaskForm(false);
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.delete("taskId");
    navigate(`${location.pathname}?${updatedParams.toString()}`);
  };

  const handleDeleteTask = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmed) return;

    dispatch(deleteTask(task.id));
    dispatch(
      showNotification({
        message: "Task deleted successfully!",
        type: "success",
      })
    );
    handleMenuClose();
  };

  const handleOpenSubmitFormModel = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("taskId", task.id);
    navigate(`${location.pathname}?${updatedParams.toString()}`);
    setOpenSubmitFormModel(true);
    handleMenuClose();
  };

  const handleCloseSubmitFormModel = () => {
    setOpenSubmitFormModel(false);
  };

  //Update status task of role USER
  const handleMarkTaskAsDone = () => {
    // Gọi action completeTask để cập nhật trạng thái task
    dispatch(completeTask({ taskId: task.id }))
      .then(() => {
        dispatch(
          showNotification({
            message: "Task marked as done successfully!",
            type: "success",
          })
        );
      })
      .catch((error) => {
        dispatch(
          showNotification({
            message: `Failed to mark task as done: ${error.message}`,
            type: "error",
          })
        );
      });
  };

  return (
    <div>
      <div className="card lg:flex justify-between">
        <div className="lg:flex gap-5 items-start space-y-2 w-[90%] lg:w-[70%]">
          <div className="flex-shrink-0">
            <img
              className="lg:w-[7rem] lg:h-[7rem] object-cover rounded-lg shadow-lg"
              src={task.image}
              alt="image"
            />
          </div>

          <div className="flex-grow space-y-5">
            <div className="space-y-2">
              <h1 className="font-bold text-lg">{task.title}</h1>
              <p className="text-gray-500 text-sm">{task.description}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="taskCard__deadline">Create At: {formattedDate}</p>
              <p
                className={`font-semibold px-3 py-1 rounded-full text-sm ${
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

            <div className="flex flex-wrap gap-2 items-center">
              {task.tags.map((item, index) => (
                <span key={index} className="py-1 px-5 rounded-full techStack">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
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
              <div>
                <MenuItem onClick={handleOpenUserList}>Assigned User</MenuItem>
                <MenuItem onClick={handleOpenSubmissionList}>
                  See Submissions
                </MenuItem>
                <MenuItem onClick={handleOpenUpdateTaskModel}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
              </div>
            ) : (
              <div>
                <MenuItem onClick={handleOpenSubmitFormModel}>Submit</MenuItem>
                <MenuItem onClick={handleMarkTaskAsDone}>Mark as Done</MenuItem>
                <MenuItem onClick={handleMarkTaskAsDone}>Mark as Assigned</MenuItem>
              </div>
            )}
          </Menu>
        </div>
      </div>

      <UserList
        open={openUserList}
        handleClose={handleCloseUserList}
        taskId={task.id}
      />
      <SubmissionsList
        open={openSubmissionList}
        handleClose={handleCloseSubmissionList}
      />
      <EditTaskForm
        key={task.id}
        open={openUpdateTaskForm}
        handleClose={handleCloseUpdateTaskForm}
        initialData={task}
      />
      <SubmitFormModel
        open={openSubmitFormModel}
        handleClose={handleCloseSubmitFormModel}
      />
    </div>
  );
};

export default TaskCard;
