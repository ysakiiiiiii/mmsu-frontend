import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    role: "guest",
    isAuthenticated: false,
  });

  const [isSignup, setIsSignup] = useState(false);

  const login = async (username, password) => {
    try {
      const res = await fetch("http://localhost/MMSU/mmsu-backend/auth/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      const role = data.role || "customer";
      setUser({ name: data.username || username, role, isAuthenticated: true });

      return Promise.resolve("success");
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const signup = async (username, email, password, repeatPassword) => {
    try {
      const res = await fetch("http://localhost/MMSU/mmsu-backend/auth/signup.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ username, email, password, repeatPassword }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Signup failed");

      const role = username === "admin" ? "admin" : "customer";
      setUser({ name: username, role, isAuthenticated: true });

      return Promise.resolve("success");
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const logout = async () => {
  try {
    await fetch("http://localhost/MMSU/mmsu-backend/auth/logout.php", {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    console.error("Logout failed", err);
  } finally {
    setUser({ name: "", role: "guest", isAuthenticated: false });
  }
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

// ✅ This allows you to use `const { user } = useAuth();` in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthWrapper");
  }
  return context;
};
