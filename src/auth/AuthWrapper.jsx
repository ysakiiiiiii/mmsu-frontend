import React, { createContext, useState } from "react";

//This creates a context named AuthContext
export const AuthContext = createContext();

//Initialize a useState and the values of user
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
    // This means that whatever component is wrapped with AuthContext will share this values: [user login ... isSignup]
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
      {/* Whatever components wraps with AuthContext shares the value from the AuthContext */}
      {children} 
    </AuthContext.Provider>
  );
};
