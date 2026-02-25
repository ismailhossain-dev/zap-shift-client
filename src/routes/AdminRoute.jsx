import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

import Loading from "../pages/Loading/Loading";
import ForBidden from "../components/ForBidden";
//login jodi nake then jodi na take and user role jodi admin na hoy tokon eta hobe /dashboard/users-management
//eta holo admin er private secure route
//children ta route.jsx teke astese
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading />;
  }

  //user jodi admin na hoy
  if (role !== "admin") {
    return <ForBidden />;
  }

  //sob tik tak takle admin page niye jawer jorno children ta use kora hoyce
  return children;
};

export default AdminRoute;
