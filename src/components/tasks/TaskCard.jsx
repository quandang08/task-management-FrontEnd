import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React, { useState } from "react";
import UserList from "../user/UserList";
import SubmissionsList from "./SubmissionList";
import EditTaskForm from "./EditTaskForm";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../features/task/TaskThunk";
import { showNotification } from "../../features/notification/NotificationSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const role = "ROLE_ADMIN";

const TaskCard = ({ task }) => {
  const formattedDate = format(new Date(task.deadline), "dd/MM/yyyy HH:mm");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCloseUserList = () => {
    setOpenUserList(false);
  };

  const [openUserList, setOpenUserList] = useState(false);
  const handleOpenUserList = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("taskId", task.id);
    navigate(`${location.pathname}?${updatedParams.toString()}`);
    setOpenUserList(true);
    handleMenuClose();
  };

  const [openSubmissionList, setOpenSubmissionList] = useState(false);
  const handleCloseSubmissionList = () => {
    setOpenSubmissionList(false);
    handleMenuClose();
  };

  const handleOpenSubmissionList = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("taskId", task.id);
    navigate(`${location.pathname}?${updatedParams.toString()}`);
    setOpenSubmissionList(true);
    handleMenuClose();
  };

  const [openUpdateTaskForm, setOpenUpdateTaskForm] = useState(false);

  const handleCloseUpdateTaskForm = () => {
    setOpenUpdateTaskForm(false);
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.delete("taskId");

    navigate(`${location.pathname}?${updatedParams.toString()}`);
  };

  const handleOpenUpdateTaskModel = () => {
    const updatedParams = new URLSearchParams(location.search);
    setOpenUpdateTaskForm(true);
    updatedParams.set("taskId", task.id);
    navigate(`${location.pathname}?${updatedParams.toString()}`);
    handleMenuClose();
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

  return (
    <div className="">
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
              <p className="taskCard__deadline">
                Create At: {format(new Date(task.deadline), "dd/MM/yyyy HH:mm")}
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
          <IconButton
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMenuClick}
          >
            <MoreHorizIcon />
          </IconButton>

          <Menu
            id="demo-positioned-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {role === "ROLE_ADMIN"
              ? [
                  <MenuItem key="user" onClick={handleOpenUserList}>
                    Assigned User
                  </MenuItem>,
                  <MenuItem
                    key="submissions"
                    onClick={handleOpenSubmissionList}
                  >
                    See Submissions
                  </MenuItem>,
                  <MenuItem key="edit" onClick={handleOpenUpdateTaskModel}>
                    Edit
                  </MenuItem>,
                  <MenuItem key="delete" onClick={handleDeleteTask}>
                    Delete
                  </MenuItem>,
                ]
              : null}
          </Menu>
        </div>
      </div>
      <UserList open={openUserList} handleClose={handleCloseUserList} taskId={task.id}/>
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
    </div>
  );
};

export default TaskCard;
