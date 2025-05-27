import React, { useContext } from "react";
import { AuthContext } from "./AuthWrapper";
import { Navigate } from "react-router-dom";

const ProtectedRouting = ({ children, role = "customer" }) => {
   const { user } = useContext(AuthContext);
 
   if (!user?.isAuthenticated || user.role !== role) {
     return <Navigate to="/login" replace />;
   }
   return children;
 };
 

export default ProtectedRouting;
