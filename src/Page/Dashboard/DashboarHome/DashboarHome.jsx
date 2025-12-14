import React from "react";
import useRole from "../../../Hook/useRole";
import CitizenDashboard from "./CitizenDashboard";
const DashboardHome = () => {
  const { role } = useRole();
  return <div>{role === "citizen" && <CitizenDashboard />}</div>;
};

export default DashboardHome;
