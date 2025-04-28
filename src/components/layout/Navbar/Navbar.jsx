import React, { useEffect } from "react";
import { Avatar } from "@mui/material";
import {
  Menu,
  Search,
  Notifications,
  ArrowDropDown,
} from "@mui/icons-material";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserDetails } from "../../../features/user/UserThunk";

const Navbar = ({ onMenuClick }) => {
  const { auth, userDetails } = useSelector((store) => ({
    auth: store.auth,
    userDetails: store.userDetails.userDetails,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      dispatch(fetchUserDetails({ userId: auth.user.id }));
    }
  }, [auth.user, dispatch]);

  const handleAvatarClick = () => {
    navigate("/profile");
  };

  const avatarSrc = userDetails?.avatarUrl || "https://i.pravatar.cc/80";

  return (
    <nav className="navbar">
      <button
        className="hamburger-btn lg:hidden"
        onClick={onMenuClick}
        aria-label="Toggle sidebar"
      >
        <Menu fontSize="large" />
      </button>

      {/* Left Section: Brand */}
      <div className="navbar-left pl-2">
        <h1 className="brand-title">AMU TASK MANAGER</h1>
      </div>

      {/* Center Section: Search */}
      <div className="navbar-center">
        <div className="search-box">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="SEARCH TASKS..."
            className="search-input"
          />
        </div>
      </div>

      {/* Right Section: User Info */}
      <div className="navbar-right">
        <Notifications className="icon" />
        <p>
          {auth.user?.role === "ROLE_ADMIN"
            ? "Admin"
            : auth.user?.fullName || "User"}
        </p>
        <Avatar
          className="user-avatar"
          sx={{ width: 40, height: 40 }}
          src={avatarSrc}
          alt={auth.user?.fullName || "User"}
          onClick={handleAvatarClick}
          style={{ cursor: "pointer" }}
        />
        <ArrowDropDown className="icon" />
      </div>
    </nav>
  );
};

export default Navbar;
