import React, { useContext } from "react";
import { FaRegUser } from "react-icons/fa";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Context/AuthContext";
import Loading from "../../../Components/Loading/Loading";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const StaffDashboard = () => {
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();
  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["dashboard", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/StaffDashboard/stats?email=${user?.email}`
      );
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  const {
    assignedCount,
    pendingCount,
    inProcessCount,
    todaysTasksCount,
    closedCount,
    resolvedCount,
    workingCount,
  } = stats.issues;

  const chartData = [
    { name: "Assigned", count: assignedCount || 0 },
    { name: "Today", count: todaysTasksCount || 0 },
    { name: "Pending", count: pendingCount || 0 },
    { name: "Progress", count: inProcessCount || 0 },
    { name: "Working", count: workingCount || 0 },
    { name: "Resolved", count: resolvedCount || 0 },
    { name: "Closed", count: closedCount || 0 },
  ];

  return (
    <div className="m-8">
      <h1 className="section-title my-4">Your Dashboard Overview</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <div className="bg-gray-100 p-4 rounded-full">
            <FaRegUser size={32} />
          </div>
          <div>
            <p className="text-xl font-semibold text-accent">Total Assigned</p>
            <h1 className="text-4xl font-black">{assignedCount}</h1>
          </div>
        </div>
        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <div className="bg-gray-100 p-4 rounded-full">
            <FaRegUser size={32} />
          </div>
          <div>
            <p className="text-xl font-semibold text-accent">Today Tasks</p>
            <h1 className="text-4xl font-black  ">{todaysTasksCount}</h1>
          </div>
        </div>
        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <div className="bg-gray-100 p-4 rounded-full">
            <FaRegUser size={32} />
          </div>
          <div>
            <p className="text-xl font-semibold text-accent">Total Pending</p>
            <h1 className="text-4xl font-black  ">{pendingCount}</h1>
          </div>
        </div>
        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <div className="bg-gray-100 p-4 rounded-full">
            <FaRegUser size={32} />
          </div>
          <div>
            <p className="text-xl font-semibold text-accent">Total Working</p>
            <h1 className="text-4xl font-black  ">{workingCount}</h1>
          </div>
        </div>
        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <div className="bg-gray-100 p-4 rounded-full">
            <FaRegUser size={32} />
          </div>
          <div>
            <p className="text-xl font-semibold text-accent">Total Resloved</p>
            <h1 className="text-4xl font-black  ">{resolvedCount}</h1>
          </div>
        </div>

        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <div className="bg-gray-100 p-4 rounded-full">
            <FaRegUser size={32} />
          </div>
          <div>
            <p className="text-xl font-semibold text-accent">Total Closed</p>
            <h1 className="text-4xl font-black  ">{closedCount}</h1>
          </div>
        </div>
      </div>

      {/* charts of stats */}

      <div className="my-12 p-10  border-t-2 border-accent/10 bg-base-100">
        <h2 className="text-accent font-bold text-2xl">Stats </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            data={chartData}
            layout="vertical"
          >
            <YAxis
              stroke="#FF9C00"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              type="category"
            ></YAxis>
            <XAxis
              stroke="#FF9C00"
              type="number"
              axisLine={false}
              tickLine={false}
            ></XAxis>
            <Tooltip />
            <Bar fill="#FF9C00" dataKey="count" barSize={30}></Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StaffDashboard;
