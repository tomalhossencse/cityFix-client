import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});
const useAxiosSecure = () => {
  const { user, userLogOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // res intercepter
    const RequestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user?.accessToken}`;
        }
        return config;
      }
    );

    const ResponseInterceptor = axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        // console.log(error);
        const errorStatus = error.response?.status;

        if (errorStatus === 401 || errorStatus === 403) {
          await userLogOut().then(() => {
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
