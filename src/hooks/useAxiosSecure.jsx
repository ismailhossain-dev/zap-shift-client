import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxiosSecure = () => {
  //step -1 axios Interceptors for jwt an secure
  const { user } = useAuth();
  useEffect(() => {
    //axios website leka dekbo function function nei ekta config
    axiosSecure.interceptors.request.use((config) => {
      //Bearer ekane amra jekono name dithe parbo and send backend
      config.headers.authorization = `Bearer ${user?.accessToken}`;
      //must be return Interceptors
      return config;
    });
  }, [user]);
  return axiosSecure;
};

export default useAxiosSecure;
