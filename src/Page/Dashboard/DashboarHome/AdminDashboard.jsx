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
import { CheckCircle2, Clock3, CreditCard, FileText, LoaderCircle, Lock, Wrench, XCircle } from "lucide-react";
import DashboardCard from "../../../Components/shared/DashboardCard";

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

  const cards = [
    {
      label: "Submitted",
      value: stats.issues?.total || 0,
      icon: <FileText className="size-5" />,
    },
    {
      label: "Pending",
      value: stats.issues?.pending || 0,
      icon: <Clock3 className="size-5" />,
    },
    {
      label: "Working",
      value: stats.issues?.working || 0,
      icon: <Wrench className="size-5" />,
    },
    {
      label: "Processing",
      value: stats.issues?.procesing || 0,
      icon: <LoaderCircle className="size-5" />,
    },
    {
      label: "Resolved",
      value: stats.issues?.resloved || 0,
      icon: <CheckCircle2 className="size-5" />,
    },
    {
      label: "Closed",
      value: stats.issues?.closed || 0,
      icon: <Lock className="size-5" />,
    },
    {
      label: "Rejected",
      value: stats.issues?.rejected || 0,
      icon: <XCircle className="size-5" />,
    },
    {
      label: "Payments",
      value: stats.issues?.totalPayments || 0,
      icon: <CreditCard className="size-5" />,
    },
  ];

  const chartData = [
    { name: "Pending", count: stats?.issues?.pending || 0 },
    { name: "Processing", count: stats?.issues?.processing || 0 },
    { name: "Working", count: stats?.issues?.working || 0 },
    { name: "Resolved", count: stats?.issues?.resolved || 0 },
    { name: "Closed", count: stats?.issues?.closed || 0 },
    { name: "Rejected", count: stats?.issues?.rejected || 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {
          cards.map((card) => (
            <DashboardCard key={card.label} icon={card.icon} value={card.value} label={card.label} />
          ))
        }
      </div>

      {/* CHART */}
      <div className="my-12 p-10 rounded-2xl border border-app-border bg-white">
        <h2 className="text-app-green font-semibold text-2xl">Stats</h2>

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


export default AdminDashboard;
