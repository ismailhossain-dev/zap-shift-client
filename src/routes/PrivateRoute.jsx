import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  //login hoyar pore location er mardome amra orno jaygay jabo
  const location = useLocation();
  // console.log(location);
  //set loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }
  //login chara private kono jaygay jaythe parbe na
  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRoute;
