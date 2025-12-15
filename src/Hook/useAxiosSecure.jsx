import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "https://city-fix-server.vercel.app",
});
const useAxiosSecure = () => {
  const { user, userLogOut } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    // res intercepter
    const RequestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
        return config;
      }
      // req inercepter
    );
    const ResponseInterceptor = axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        console.log(error);
        const errorStatus = error.status;
        if (errorStatus === 401 || errorStatus === 403) {
          userLogOut().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(RequestInterceptor);
      axiosSecure.interceptors.response.eject(ResponseInterceptor);
    };
  }, [user, navigate, userLogOut]);
  return axiosSecure;
};

export default useAxiosSecure;
