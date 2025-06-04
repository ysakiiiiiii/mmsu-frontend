import React, { useContext } from "react";
import { AuthContext } from "../../../auth/AuthWrapper";
import { Navigate } from "react-router-dom";
import NotFound from "../../pages/NotFound";
import Spinner from "../../common/Spinner"

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
        return <Spinner message="Checking authentication..." />;
  }

  // If not authenticated at all, redirect to login/home
  if (!user.isAuthenticated || user.role === "guest") {
    return <Navigate to="/" replace />;
  }
  // If authenticated but not admin, show NotFound
  if (user.role !== "admin") {
    return <NotFound />;
  }

  // Authorized
  return children;
};

export default AdminRoute;
