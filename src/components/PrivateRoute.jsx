import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  const token = Cookies.get("token");
  return currentUser && token ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;
