import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

//fist use korsi dashboardLayout.jsx te dynamic role admin , approve
//2.AdminRoute.jsx  route use kora hoytese jathe website kono url lekle website chole jayte na pare private kora hoytese

const useRole = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  //default admin ta takle byDefault user takbe
  //email & role mardome data antechi
  const { isLoading: roleLoading, data: role = "user" } = useQuery({
    queryKey: ["user-role", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data;
    },
  });

  //role vitore data gola return kortechi
  return { role, roleLoading };
};

export default useRole;
