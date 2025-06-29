import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      console.warn("Invalid user data in localStorage", err);
      return null;
    }
  });

  const login = (userData) => {
    if (!userData?.accessToken) {
      console.error("Login: Missing accessToken in the response.");
      return;
    }

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    console.log("Logged in:", userData.name);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    console.log("Logged out.");
  };

  const isLoggedIn = !!user?.accessToken;

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
