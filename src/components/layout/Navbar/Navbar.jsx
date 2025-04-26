import React from "react";
import { Avatar } from "@mui/material";
import {
  Menu,
  Search,
  Notifications,
  ArrowDropDown,
} from "@mui/icons-material";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // thêm cái này

const Navbar = ({ onMenuClick }) => {
  const { task, auth } = useSelector((store) => store);
  const navigate = useNavigate(); // hook chuyển trang

  const handleAvatarClick = () => {
    navigate("/profile"); // chuyển tới đường dẫn Profile
  };

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
      <div className="navbar-left">
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
          src="https://i.pravatar.cc/80"
          alt="User"
          onClick={handleAvatarClick} // thêm sự kiện click
          style={{ cursor: "pointer" }} // icon có tay trỏ
        />
        <ArrowDropDown className="icon" />
      </div>
    </nav>
  );
};

export default Navbar;
