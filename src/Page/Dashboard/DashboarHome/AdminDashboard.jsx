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
import AllIssuesDashboard from "../../AllIssuesDashboard/AllIssuesDashboard";
import LatestDashboardIssues from "../../../Components/LatestDashboardIssues/LatestDashboardIssues";
import LatestPayments from "../../../Components/LatestPayments/LatestPayments";
import LatestUsers from "../../../Components/LatestUsers/LatestUsers";
const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();
  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["dashboard", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/adminDashboard/stats`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }

  const chartData = [
    { name: "Pending", count: stats?.issues?.pending || 0 },
    { name: "Processing", count: stats?.issues?.procesing || 0 },
    { name: "Working", count: stats?.issues?.working || 0 },
    { name: "Resolved", count: stats?.issues?.resloved || 0 },
    { name: "Closed", count: stats?.issues?.closed || 0 },
    { name: "Rejected", count: stats?.issues?.rejected || 0 },
  ];

  return (
    <div className="m-8">
      <h1 className="section-title my-4">Your Dashboard Overview</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-4">
        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md md:p-6 p-2">
          <div className="bg-gray-100 p-2 rounded-full">
            <FaRegUser size={20} />
          </div>
          <div>
            <p className="text-xl font-semibold text-accent">Total submitted</p>
            <h1 className="md:text-4xl text-2xl font-black">
              {stats?.issues?.total}
            </h1>
          </div>
        </div>
        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <div className="bg-gray-100 p-2 rounded-full">
            <FaRegUser size={16} />
          </div>
          <div>
            <p className="text-xl font-semibold text-accent">Pending Issues</p>
            <h1 className="md:text-4xl text-2xl font-black">
              {stats?.issues?.pending}
            </h1>
            <p></p>
          </div>
        </div>
        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <div className="bg-gray-100 p-2 rounded-full">
            <FaRegUser size={20} />
          </div>
          <div>
            <p className="text-xl font-semibold text-accent">
              Total In-Procesing
            </p>
            <h1 className="md:text-4xl text-2xl font-black">
              {stats?.issues?.procesing}
            </h1>
            <p></p>
          </div>
        </div>
        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <div className="bg-gray-100 p-2 rounded-full">
            <FaRegUser size={20} />
          </div>
          <div>
            <p className="text-xl font-semibold text-accent">Total Working</p>
            <h1 className="md:text-4xl text-2xl font-black">
              {stats?.issues?.working}
            </h1>
            <p></p>
          </div>
        </div>
        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <div className="bg-gray-100 p-2 rounded-full">
            <FaRegUser size={20} />
          </div>
          <div>
            <p className="text-xl font-semibold text-accent">Total Resloved</p>
            <h1 className="md:text-4xl text-2xl font-black">
              {stats?.issues?.resloved}
            </h1>
          </div>
        </div>

        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <div className="bg-gray-100 p-2 rounded-full">
            <FaRegUser size={20} />
          </div>
          <div>
            <p className="text-xl font-semibold text-accent">Total Closed</p>
            <h1 className="md:text-4xl text-2xl font-black">
              {stats?.issues?.closed}
            </h1>
            <p></p>
          </div>
        </div>
        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <div className="bg-gray-100 p-2 rounded-full">
            <FaRegUser size={20} />
          </div>
          <div>
            <p className="text-xl font-semibold text-accent">Total Rejected</p>
            <h1 className="md:text-4xl text-2xl font-black">
              {stats?.issues?.rejected}
            </h1>
            <p></p>
          </div>
        </div>
        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <div className="bg-gray-100 p-2 rounded-full">
            <FaRegUser size={20} />
          </div>
          <div>
            <p className="text-xl font-semibold text-accent">Total Payments</p>
            <h1 className="md:text-4xl text-2xl font-black">
              {stats?.issues?.totalPayments} BDT
            </h1>
            <p></p>
          </div>
        </div>
      </div>

      {/* charts of stats */}

      <div className="my-12 p-10 border-t-2 border-accent/10 bg-base-100">
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
      <LatestDashboardIssues />
      <LatestPayments />
      <LatestUsers />
    </div>
  );
};

export default AdminDashboard;
