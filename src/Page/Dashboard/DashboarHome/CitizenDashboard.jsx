import React, { useContext } from "react";
import { FaRegUser } from "react-icons/fa";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Context/AuthContext";
import Loading from "../../../Components/Loading/Loading";
const CitizenDashboard = () => {
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();
  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["dashboard", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/stats?email=${user?.email}`
      );
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-6">
      <h1>This Citzen dashboard home</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <div className="bg-gray-100 p-4 rounded-full">
            <FaRegUser size={32} />
          </div>
          <div>
            <p className="text-xl font-semibold text-accent">Total submitted</p>
            <h1 className="text-4xl font-black">{stats?.issues?.total}</h1>
          </div>
        </div>
        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <FaRegUser size={32} />
          <div>
            <p className="text-xl font-semibold text-accent">Pending Issues</p>
            <h1 className="text-4xl font-black  ">{stats?.issues?.pending}</h1>
            <p></p>
          </div>
        </div>
        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <FaRegUser size={32} />
          <div>
            <p className="text-xl font-semibold text-accent">
              Total In-Procesing
            </p>
            <h1 className="text-4xl font-black  ">
              {stats?.issues?.procesing}
            </h1>
            <p></p>
          </div>
        </div>
        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <FaRegUser size={32} />
          <div>
            <p className="text-xl font-semibold text-accent">Total Working</p>
            <h1 className="text-4xl font-black  ">{stats?.issues?.working}</h1>
            <p></p>
          </div>
        </div>
        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <FaRegUser size={32} />
          <div>
            <p className="text-xl font-semibold text-accent">Total Resloved</p>
            <h1 className="text-4xl font-black  ">{stats?.issues?.resloved}</h1>
          </div>
        </div>

        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <FaRegUser size={32} />
          <div>
            <p className="text-xl font-semibold text-accent">Total Closed</p>
            <h1 className="text-4xl font-black  ">{stats?.issues?.closed}</h1>
            <p></p>
          </div>
        </div>
        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <FaRegUser size={32} />
          <div>
            <p className="text-xl font-semibold text-accent">Total Rejected</p>
            <h1 className="text-4xl font-black  ">{stats?.issues?.rejected}</h1>
            <p></p>
          </div>
        </div>
        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <FaRegUser size={32} />
          <div>
            <p className="text-xl font-semibold text-accent">Total Payments</p>
            <h1 className="text-4xl font-black  ">
              BDT {stats?.issues?.totalPayments}
            </h1>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;
