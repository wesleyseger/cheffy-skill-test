import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  if (JSON.parse(localStorage.getItem('user'))) {
    return children;
  }
  else return <Navigate to="/login" replace />;
};