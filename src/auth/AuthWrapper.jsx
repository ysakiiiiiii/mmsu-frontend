import React, { createContext, useContext, useState } from "react";
import { RenderMenu, RenderRoutes } from "../components/structure/RenderNavigation";

export const AuthContext = createContext(); // Export the actual context object

export const AuthWrapper = () => {
  const [user, setUser] = useState({ name: "", role: "guest", isAuthenticated: false });
  const [isSignup, setIsSignup] = useState(false);  // Track whether the user is signing up

  const login = (userName, password) => {
    return new Promise((resolve, reject) => {
      if (password === "password") {
        const role = userName === "admin" ? "admin" : "private";
        setUser({ name: userName, role, isAuthenticated: true });
        resolve("success");
      } else {
        reject("Incorrect password");
      }
    });
  };

  const signup = (userName, password) => {
    return new Promise((resolve, reject) => {
      if (password === "password") {
        const role = userName === "admin" ? "admin" : "private";
        setUser({ name: userName, role, isAuthenticated: true });
        resolve("success");
      } else {
        reject("Incorrect password");
      }
    });
  };

  const logout = () => {
    setUser({ name: "", role: "guest", isAuthenticated: false });
  };

  const switchToSignup = () => {
    setIsSignup(true);
  };

  const switchToLogin = () => {
    setIsSignup(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, switchToSignup, switchToLogin, isSignup }}>
      <>
        <RenderMenu />
        <RenderRoutes />
      </>
    </AuthContext.Provider>
  );
};
