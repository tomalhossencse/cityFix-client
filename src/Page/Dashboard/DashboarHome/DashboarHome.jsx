import React from "react";
import useRole from "../../../Hook/useRole";
import CitizenDashboard from "./CitizenDashboard";
const DashboardHome = () => {
  const { role } = useRole();
  return (
    <div>
      <div className="section-title my-4">Dashboard Overview</div>
      {role === "citizen" && <CitizenDashboard />}
    </div>
  );
};

export default DashboardHome;
