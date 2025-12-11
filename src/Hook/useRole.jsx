import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: role = "citizen", isLoading } = useQuery({
    queryKey: ["user-role", user?.email, "role"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}/role`);
      return res.data.role;
    },
  });
  return { role, isLoading };
};

export default useRole;
