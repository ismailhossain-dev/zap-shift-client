import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxiosSecure = () => {
  //step -1 axios Interceptors for jwt an secure
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  //useEffect diye kori bar bar data render na hoyer jorno
  useEffect(() => {
    //axios website leka dekbo function function nei ekta config
    const reqInterCeptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${user?.accessToken}`;
      //Bearer pore onek gola white space dile login page niye jabe nicher condition gola kaj korbe
      // config.headers.authorization = `Bearer    ${user?.accessToken}`;
      //must be return Interceptors
      return config;
    });
    //remove intercepts response axios documentation
    //Interceptor response
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        //payment history
        console.log(error);
        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          logOut(() => {
            navigate("/login");
          });
        }
        //interceptor error jwt work

        return Promise.reject(error);
      },
    );

    return () => {
      //user jodi user email chara orno karor data chai tahole remove kore divo interceptor
      axiosSecure.interceptors.request.eject(reqInterCeptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);
  return axiosSecure;
  //finished jwt work
};

export default useAxiosSecure;
