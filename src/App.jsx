import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "./features/auth/AuthThunk";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import lightTheme from "./theme/lightTheme";
import Navbar from "./components/layout/Navbar/Navbar";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import AppRouter from "./routes/AppRouter";

function App() {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.auth.jwt);
  const user = useSelector((state) => state.auth.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = jwt || localStorage.getItem("jwt");
    if (token && !user) {
      dispatch(getUserProfile(token));
    }
  }, [dispatch, jwt, user]);

  const toggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {user && <Navbar onMenuClick={toggleSidebar} />}

      {user && (
        <>
          <Sidebar
            className={sidebarOpen ? "open" : ""}
            onClose={() => setSidebarOpen(false)}
          />
          {sidebarOpen && (
            <div
              className="overlay fixed inset-0 bg-black bg-opacity-40 z-40"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </>
      )}

      <AppRouter />
      <ToastContainer position="top-right" autoClose={3000} />
    </ThemeProvider>
  );
}

export default App;
