import * as React from "react";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserList } from "../../features/auth/AuthThunk";
import { assignTaskToUser } from "../../features/task/TaskThunk";
import { showNotification } from "../../features/notification/NotificationSlice";

import "./UserList.css";

export default function UserList({ handleClose, open }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("taskId");

  React.useEffect(() => {
    dispatch(getUserList(localStorage.getItem("jwt")));
  }, [dispatch]);

  const handleSelectUser = async (user) => {
  try {
    // 1. Gọi assign, unwrap để chờ hoàn thành
    await dispatch(assignTaskToUser({ userId: user.id, taskId })).unwrap();

    // 2. Hiển thị notification success
    dispatch(showNotification({
      type: "success",
      message: `Đã giao task cho ${user.fullName} thành công`
    }));

    // 3. Xóa taskId khỏi URL để List component re‐fetch tasks
    const params = new URLSearchParams(location.search);
    params.delete("taskId");
    navigate(`${location.pathname}?${params.toString()}`);

    // 4. Đóng modal
    handleClose();
  } catch (error) {
    // Nếu assign thất bại thì show error
    dispatch(showNotification({
      type: "error",
      message: error || "Giao task thất bại"
    }));
  }
};


  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="user-list-modal">
        <List>
          {auth.users?.length > 0 ? (
            auth.users.map((user, index) => (
              <React.Fragment key={user.id}>
                <ListItem
                  disableGutters
                  className="user-list-item"
                  secondaryAction={
                    <Button
                      onClick={() => handleSelectUser(user)}
                      variant="outlined"
                      className="select-button"
                    >
                      Select
                    </Button>
                  }
                >
                  <ListItemAvatar>
                    <Avatar className="user-avatar" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <span className="user-name">
                        {user.fullName || "Unknown User"}
                      </span>
                    }
                    secondary={
                      <span className="user-handle">
                        @
                        {user.fullName
                          ? user.fullName.split(" ").join("_").toLowerCase()
                          : "unknown_user"}
                      </span>
                    }
                  />
                </ListItem>
                {index !== auth.users.length - 1 && (
                  <Divider sx={{ borderColor: "#000" }} />
                )}
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <ListItemText
                primary="No users available"
                secondary="Please check your connection or data."
              />
            </ListItem>
          )}
        </List>
      </Box>
    </Modal>
  );
}
