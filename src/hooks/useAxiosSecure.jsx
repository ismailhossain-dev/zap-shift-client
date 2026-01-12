import axios from "axios";
import React from "react";
//ei hooks ta create kora hoyce data fetch korar jorno
const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
