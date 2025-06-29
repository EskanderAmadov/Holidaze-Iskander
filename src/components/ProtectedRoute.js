import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requireManager = false }) => {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (requireManager && !user?.venueManager) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default ProtectedRoute;
