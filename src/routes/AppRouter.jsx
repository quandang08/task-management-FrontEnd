import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "../components/pages/Auth/Auth";
import HomePage from "../components/pages/HomePage";
import NotFound from "../components/pages/not-found/NotFound";
import Profile from "../components/layout/Profile/Profile";

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

      <Route path="*" element={<NotFound />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRouter;
