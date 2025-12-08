import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../Components/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to={"/login"} state={location?.pathname}></Navigate>;
  }

  return children;
};

export default PrivateRoute;
