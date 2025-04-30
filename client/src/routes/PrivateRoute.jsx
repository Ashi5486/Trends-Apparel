// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // or sessionStorage
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
