import React from 'react';
import { Avatar } from '@mui/material';
import { Search, Notifications, ArrowDropDown } from '@mui/icons-material';
import "./Navbar.css";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const {task, auth} = useSelector(store=>store);

  return (
    <nav className="navbar">
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
        <p>{auth.user?.fullName || "Admin"}</p>
        <Avatar 
          className="user-avatar"
          sx={{ width: 40, height: 40 }} 
          src="https://i.pravatar.cc/80" 
          alt="User" 
        />
        <ArrowDropDown className="icon" />
      </div>
    </nav>
  );
};

export default Navbar;
