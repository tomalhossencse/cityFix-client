import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    });
  }, [user]);
  return axiosSecure;
};

export default useAxiosSecure;
