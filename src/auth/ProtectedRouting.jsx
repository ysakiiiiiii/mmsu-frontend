import React, { useContext } from "react";
import { AuthContext } from "./AuthWrapper";
import { Navigate } from "react-router-dom";
import Spinner from "../components/common/Spinner";

const ProtectedRouting = ({ children, role = "customer" }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Spinner message="Checking authentication..." />;
  }

  if (!user?.isAuthenticated || user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRouting;
