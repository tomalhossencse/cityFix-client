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
import LatestDashboardIssues from "../../../Components/LatestDashboardIssues/LatestDashboardIssues";
import LatestPayments from "../../../Components/LatestPayments/LatestPayments";
import LatestUsers from "../../../Components/LatestUsers/LatestUsers";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["dashboard"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/adminDashboard/stats");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const chartData = [
    { name: "Pending", count: stats?.issues?.pending || 0 },
    { name: "Processing", count: stats?.issues?.processing || 0 },
    { name: "Working", count: stats?.issues?.working || 0 },
    { name: "Resolved", count: stats?.issues?.resolved || 0 },
    { name: "Closed", count: stats?.issues?.closed || 0 },
    { name: "Rejected", count: stats?.issues?.rejected || 0 },
  ];

  return (
    <div className="m-8">
      <h1 className="section-title my-4">Your Dashboard Overview</h1>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
        <DashboardCard title="Submitted" value={stats?.issues?.total} />
        <DashboardCard title="Pending" value={stats?.issues?.pending} />
        <DashboardCard title="Processing" value={stats?.issues?.processing} />
        <DashboardCard title="Working" value={stats?.issues?.working} />
        <DashboardCard title="Resolved" value={stats?.issues?.resolved} />
        <DashboardCard title="Closed" value={stats?.issues?.closed} />
        <DashboardCard title="Rejected" value={stats?.issues?.rejected} />
        <DashboardCard
          title="Payments"
          value={`${stats?.issues?.totalPayments} BDT`}
        />
      </div>

      {/* CHART */}
      <div className="my-12 p-10 border-t-2 border-accent/10 bg-base-100">
        <h2 className="text-accent font-bold text-2xl">Stats</h2>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} layout="vertical">
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
            />
            <XAxis type="number" axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#FF9C00" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <LatestDashboardIssues />
      <LatestPayments />
      <LatestUsers />
    </div>
  );
};

const DashboardCard = ({ title, value }) => (
  <div className="flex text-accent items-center gap-4 justify-center bg-base-100 rounded-md md:p-6 p-2">
    <div className="bg-gray-100 p-2 rounded-full">
      <FaRegUser size={20} />
    </div>
    <div>
      <p className="md:text-xl text-md font-semibold">{title}</p>
      <h1 className="md:text-4xl text-2xl font-black">{value ?? 0}</h1>
    </div>
  </div>
);

export default AdminDashboard;
