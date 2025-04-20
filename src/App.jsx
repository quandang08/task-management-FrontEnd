// @ts-nocheck
import { useEffect } from "react";
import Navbar from "./components/layout/Navbar/Navbar";
import Auth from "./components/pages/Auth/Auth";
import HomePage from "./components/pages/HomePage";
import darkTheme from "./theme/darkTheme";
import lightTheme from "./theme/lightTheme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "./features/task/TaskThunk";
import { getUserProfile } from "./features/auth/AuthThunk";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  const jwt = useSelector((state) => state.auth.jwt);
  const userProfile = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (jwt || localStorage.getItem("jwt")) {
      dispatch(getUserProfile(jwt || localStorage.getItem("jwt")));
    }
    dispatch(fetchTasks({}));
  }, [dispatch, jwt]);

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {userProfile ? (
        <div>
          <Navbar />
          <HomePage />
        </div>
      ) : (
        <Auth />
      )}
      
      <ToastContainer position="top-right" autoClose={3000} />
    </ThemeProvider>
  );
}

export default App;
