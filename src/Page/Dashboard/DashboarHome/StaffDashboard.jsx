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
import {
  ClipboardList,
  CalendarDays,
  Clock,
  LoaderCircle,
  BriefcaseBusiness,
  CheckCircle2,
  Archive,
  BarChart3,
} from "lucide-react";
import DashboardCard from "../../../Components/shared/DashboardCard";
const StaffDashboard = () => {
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["dashboard", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/staffDashboard/stats?email=${user?.email}`
      );
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }

  const cards = [
    {
      label: "Assigned",
      value: stats.issues?.assignedCount || 0,
      icon: <ClipboardList className="size-5" />,
    },

    {
      label: "Today",
      value: stats.issues?.todaysTasksCount || 0,
      icon: <CalendarDays className="size-5" />,
    },

    {
      label: "Pending",
      value: stats.issues?.pendingCount || 0,
      icon: <Clock className="size-5" />,
    },

    {
      label: "Progress",
      value: stats.issues?.inProcessCount || 0,
      icon: <LoaderCircle className="size-5" />,
    },

    {
      label: "Working",
      value: stats.issues?.workingCount || 0,
      icon: <BriefcaseBusiness className="size-5" />,
    },

    {
      label: "Resolved",
      value: stats.issues?.resolvedCount || 0,
      icon: <CheckCircle2 className="size-5" />,
    },

    {
      label: "Closed",
      value: stats.issues?.closedCount || 0,
      icon: <Archive className="size-5" />,
    },

    {
      label: "Total",
      value: stats.issues?.assignedCount || 0,
      icon: <BarChart3 className="size-5" />,
    },
  ];


  const chartData = [
    { name: "Assigned", count: stats.issues?.assignedCount || 0 },
    { name: "Today", count: stats.issues?.todaysTasksCount || 0 },
    { name: "Pending", count: stats.issues?.pendingCount || 0 },
    { name: "Progress", count: stats.issues?.inProcessCount || 0 },
    { name: "Working", count: stats.issues?.workingCount || 0 },
    { name: "Resolved", count: stats.issues?.resolvedCount || 0 },
    { name: "Closed", count: stats.issues?.closedCount || 0 },
  ];

  return (
    <div className="space-y-6">
      {/* stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {
          cards.map((card) => (
            <DashboardCard key={card.label} icon={card.icon} value={card.value} label={card.label} />
          ))
        }
      </div>

      {/* charts of stats */}

      <div className="my-12 p-10  border border-app-border rounded-2xl bg-white">
        <h2 className="text-app-green font-semibold text-2xl">Stats </h2>
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
