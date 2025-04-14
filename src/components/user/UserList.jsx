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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "#fff",
  border: "4px solid #000",
  boxShadow: "8px 8px 0 0 #000",
  p: 4,
};

const users = [1, 1, 1, 1];

export default function UserList({ handleClose, open }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="brutalist-user-list-title"
      aria-describedby="brutalist-user-list-description"
    >
      <Box sx={style}>
        <List>
          {users.map((_, index) => (
            <React.Fragment key={index}>
              <ListItem
                secondaryAction={
                  <Button
                    variant="outlined"
                    onClick={handleClose}
                    sx={{
                      border: "2px solid #000",
                      color: "#000",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      padding: "0.5rem 1rem",
                      minWidth: "90px",
                      borderRadius: 0,
                      "&:hover": {
                        backgroundColor: "#000",
                        color: "#fff",
                      },
                    }}
                  >
                    Select
                  </Button>
                }
                disableGutters
                sx={{
                  paddingY: "0.5rem",
                  borderRadius: 0,
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      border: "2px solid #000",
                      boxShadow: "4px 4px 0 0 #000",
                      borderRadius: 0,
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <span
                      style={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        borderBottom: "2px solid #000",
                      }}
                    >
                      Code with Amu
                    </span>
                  }
                  secondary={
                    <span style={{ color: "#555", fontFamily: "monospace" }}>
                      @code_with_amu
                    </span>
                  }
                />
              </ListItem>
              {index !== users.length - 1 && (
                <Divider sx={{ borderColor: "#000" }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Modal>
  );
}
