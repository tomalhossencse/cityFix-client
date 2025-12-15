import React from "react";
import useRole from "../../../Hook/useRole";
import CitizenDashboard from "./CitizenDashboard";
import StaffDashboard from "./StaffDashboard";
import AdminDashboard from "./AdminDashboard";
const DashboardHome = () => {
  const { role } = useRole();
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
