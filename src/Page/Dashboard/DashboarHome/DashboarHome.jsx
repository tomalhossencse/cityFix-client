import React from "react";
import useRole from "../../../Hook/useRole";
import CitizenDashboard from "./CitizenDashboard";
import StaffDashboard from "./StaffDashboard";
import AdminDashboard from "./AdminDashboard";
import Loading from "../../../Components/Loading/Loading";
const DashboardHome = () => {
  const { role, isLoading } = useRole();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {role === "staff" ? (
        <StaffDashboard />
      ) : role === "admin" ? (
        <AdminDashboard />
      ) : (
        <CitizenDashboard />
      )}
    </div>
  );
};

export default DashboardHome;
