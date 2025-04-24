import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    role: "guest",
    isAuthenticated: false,
  });

  const [isSignup, setIsSignup] = useState(false);

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

  const switchToSignup = () => setIsSignup(true);
  const switchToLogin = () => setIsSignup(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        switchToSignup,
        switchToLogin,
        isSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
