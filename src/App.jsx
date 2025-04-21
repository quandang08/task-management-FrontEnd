import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "./features/auth/AuthThunk";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import lightTheme from "./theme/lightTheme";
import Navbar from "./components/layout/Navbar/Navbar";
import AppRouter from "./routes/AppRouter";
import { useLocation } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const jwt = useSelector((state) => state.auth.jwt);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const token = jwt || localStorage.getItem("jwt");
    if (token && !user) {
      dispatch(getUserProfile(token));
    }
  }, [dispatch, jwt, user]);

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
