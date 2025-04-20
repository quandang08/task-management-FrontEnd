import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "./features/task/TaskThunk";
import { getUserProfile } from "./features/auth/AuthThunk";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import lightTheme from "./theme/lightTheme";
import Navbar from "./components/layout/Navbar/Navbar";
import AppRouter from "./routes/AppRouter";

function App() {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.auth.jwt);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const token = jwt || localStorage.getItem("jwt");
    if (token) {
      dispatch(getUserProfile(token));
    }
    dispatch(fetchTasks({}));
  }, [dispatch, jwt]);

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {user && <Navbar />}
      <AppRouter />
      <ToastContainer position="top-right" autoClose={3000} />
    </ThemeProvider>
  );
}

export default App;

