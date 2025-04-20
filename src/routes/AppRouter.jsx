import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "../components/pages/Auth/Auth";
import HomePage from "../components/pages/HomePage";

const AppRouter = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <HomePage /> : <Navigate to="/auth" replace />}
      />
      <Route
        path="/auth"
        element={!user ? <Auth /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default AppRouter;
