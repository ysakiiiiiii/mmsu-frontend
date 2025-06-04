import React, { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    name: "",
    role: "guest",
    isAuthenticated: false,
  });

  const [isSignup, setIsSignup] = useState(false);

  // Load user profile from saved id on app load
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("authUser"));
    if (savedUser?.id) {
      fetchUserProfile(savedUser.id).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Helper: fetch user profile by id and update state
  const fetchUserProfile = async (userId) => {
    try {
      const res = await fetch(
        `http://localhost/MMSU/mmsu-backend/profile/get_user_profile.php?user_id=${userId}`
      );
      const profile = await res.json();
      if (!profile.error) {
        setUser({
          id: profile.user_id,
          name: profile.username,
          role: profile.role || "customer",
          isAuthenticated: true,
          ...profile,
        });
        localStorage.setItem(
          "authUser",
          JSON.stringify({
            id: profile.user_id,
            name: profile.username,
            role: profile.role || "customer",
            isAuthenticated: true,
          })
        );
      } else {
        logout();
      }
    } catch (err) {
      console.error("Failed to fetch user profile", err);
      logout();
    }
  };

  const login = async (username, password) => {
    try {
      const res = await fetch(
        "http://localhost/MMSU/mmsu-backend/auth/login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      // After successful login, fetch full user profile
      await fetchUserProfile(data.user_id);

      return Promise.resolve("success");
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const signup = async (username, email, password, repeatPassword) => {
    try {
      const res = await fetch(
        "http://localhost/MMSU/mmsu-backend/auth/signup.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ username, email, password, repeatPassword }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      // After signup, fetch profile
      await fetchUserProfile(data.user_id);

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
      localStorage.removeItem("authUser");
      setUser({ id: null, name: "", role: "guest", isAuthenticated: false });
    }
  };

  const switchToSignup = () => setIsSignup(true);
  const switchToLogin = () => setIsSignup(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        signup,
        logout,
        switchToSignup,
        switchToLogin,
        isSignup,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthWrapper");
  }
  return context;
};
