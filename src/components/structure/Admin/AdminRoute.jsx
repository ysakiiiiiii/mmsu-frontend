import React from "react";
import { AuthContext } from "../../../auth/AuthWrapper";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import NotFound from "../../pages/NotFound";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user.isAuthenticated || user.role === "guest") {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/404" replace />;
  }

  return children;
};


export default AdminRoute;
