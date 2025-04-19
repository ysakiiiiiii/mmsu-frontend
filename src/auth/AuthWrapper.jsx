import { createContext, useContext, useState } from "react";
import RenderHeader from "../components/structure/Header";
import { RenderMenu, RenderRoutes } from "../components/structure/RenderNavigation";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const [user, setUser] = useState({ name: "", role: "guest", isAuthenticated: false });

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

  const logout = () => {
    setUser({ name: "", role: "guest", isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <>
        {/* <RenderHeader /> */}
        <RenderMenu />
        <RenderRoutes />
      </>
    </AuthContext.Provider>
  );
};
