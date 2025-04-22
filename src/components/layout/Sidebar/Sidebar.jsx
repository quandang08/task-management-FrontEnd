import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import {
  Home,
  CheckCircle,
  AssignmentInd,
  PendingActions,
  AddTask,
  Notifications,
  LightMode,
  DarkMode,
} from "@mui/icons-material";
import "./Sidebar.css";
import CreateTaskForm from "../../tasks/CreateTask/CreateTaskForm";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/AuthThunk";

const menu = [
  {
    name: "HomePage",
    icon: <Home />,
    value: "HomePage",
    role: ["ROLE_ADMIN", "ROLE_USER"],
  },
  {
    name: "DONE",
    icon: <CheckCircle />,
    value: "DONE",
    role: ["ROLE_ADMIN", "ROLE_USER"],
  },
  {
    name: "ASSIGNED",
    icon: <AssignmentInd />,
    value: "ASSIGNED",
    role: ["ROLE_ADMIN"],
  },
  {
    name: "NOT ASSIGNED",
    icon: <PendingActions />,
    value: "PENDING",
    role: ["ROLE_ADMIN"],
  },
  {
    name: "Create New Task",
    icon: <AddTask />,
    value: "CREATE",
    role: ["ROLE_ADMIN"],
  },
  {
    name: "Notification",
    icon: <Notifications />,
    value: "NOTIFICATION",
    role: ["ROLE_ADMIN", "ROLE_USER"],
  },
];

const role = "ROLE_ADMIN";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [activeMenu, setActiveMenu] = useState("HomePage");
  const [darkMode, setDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openCreateTaskForm, setOpenCreateTaskForm] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filter = params.get("filter") || "HomePage";
    setActiveMenu(filter);
  }, [location.search]);

  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleCollapse = () => setCollapsed(!collapsed);

  const handleMenuChange = (item) => {
    if (item.name === "Create New Task") {
      setOpenCreateTaskForm(true);
      return;
    }
    if (activeMenu === item.value) return;
  
    const updatedParams = new URLSearchParams(location.search);
  
    if (item.value === "HomePage") {
      updatedParams.delete("filter");
      navigate(`${location.pathname}?${updatedParams.toString()}`);
    } else {
      updatedParams.set("filter", item.value);
      navigate(`${location.pathname}?${updatedParams.toString()}`);
    }
  
    setActiveMenu(item.value);
  };
  

  const handleCloseCreateTaskForm = () => {
    setOpenCreateTaskForm(false);
  };

  const handleLogout = async () => {
    const confirm = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (!confirm) return;
  
    try {
      await dispatch(logout());
      navigate("/auth");
    } catch (error) {
      console.error("Đăng xuất thất bại:", error);
    }
  };

  return (
    <>
      <div
        className={`sidebar ${darkMode ? "dark" : "light"} ${
          collapsed ? "collapsed" : ""
        } flex flex-col justify-between`}
      >
        <div>
          <div className="flex justify-center mt-6 mb-6">
            {!collapsed && (
              <div className="text-2xl font-black uppercase tracking-wide text-center">
                Task Manager Amu
              </div>
            )}
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-3 mt-8">
            {menu
              .filter((item) => item.role.includes(role))
              .map((item) => (
                <div
                  key={item.value}
                  onClick={() => handleMenuChange(item)}
                  className={`menuItem flex items-center gap-3 px-4 py-3 cursor-pointer font-bold ${
                    activeMenu === item.value ? "activeMenuItem" : ""
                  }`}
                >
                  {item.icon}

                  {!collapsed && <span className="menuName">{item.name}</span>}
                </div>
              ))}
          </div>
        </div>

        {/* Bottom Area */}
        <div className="flex flex-col gap-4 mt-8">
          <button
            onClick={toggleTheme}
            className="themeToggle flex items-center justify-center gap-2 py-2 font-bold hover:scale-105 transition"
          >
            {darkMode ? <LightMode /> : <DarkMode />}{" "}
            {!collapsed && (darkMode ? "Light" : "Dark")}
          </button>

          <button
            onClick={toggleCollapse}
            className="collapseToggle flex items-center justify-center gap-2 py-2 font-bold bg-blue-500 text-white hover:scale-105 transition"
          >
            {collapsed ? "Expand" : "Collapse"}
          </button>

          <button
            onClick={handleLogout}
            className="logoutButton py-2 hover:scale-105 transition"
          >
            {!collapsed ? "Logout" : <span className="sr-only">Logout</span>}
          </button>
        </div>
      </div>

      <CreateTaskForm
        open={openCreateTaskForm}
        handleClose={handleCloseCreateTaskForm}
      />
    </>
  );
};

export default Sidebar;
