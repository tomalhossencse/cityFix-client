import React, { useContext } from "react";
import { AiOutlineIssuesClose } from "react-icons/ai";
import {
  MdOutlineAssignmentReturned,
  MdOutlineDashboardCustomize,
  MdPayments,
} from "react-icons/md";
import { RiCheckboxMultipleFill, RiMenu2Line } from "react-icons/ri";
import { Link, NavLink, Outlet } from "react-router";
import User from "../Components/User/User";
import { AuthContext } from "../Context/AuthContext";
import { TbReport } from "react-icons/tb";
import { FaRegUser, FaUsersCog } from "react-icons/fa";
import { CapitalizeFirstLetter } from "../Utility/CapitalizeFirstLetter";
import { IoPersonAdd } from "react-icons/io5";
import useRole from "../Hook/useRole";
import Loading from "../Components/Loading/Loading";
import { Toaster } from "react-hot-toast";
import Theme from "../Components/Theme/Theme";
import Navbar from "../Components/Navbar/Navbar";
import { ShieldIcon } from "lucide-react";
import { dashboardLinkData } from "../assets/assets";




const DashboardLayout = () => {


  // const { user, loading } = useContext(AuthContext);
  const { role, isLoading: roleLoading } = useRole();
  // if (roleLoading) {
  //   return <Loading />;
  // }
  const filterLinkData = dashboardLinkData.filter((link) =>
    link.role.includes(role)
  )

  return (
    <div className="h-screen overflow-hidden">

      {/* navbar */}
      <div className="max-lg:hidden">
        <Navbar />
      </div>

      {/* dashboard panal */}
      <div className="flex flex-col lg:flex-row h-full gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {/* side bar */}
        <aside className="w-full lg:w-64 shrink-0 bg-white h-fit rounded-2xl p-4 border border-app-border">
          <div className="pb-4 mb-4 border-b border-app-border">
            <h2 className="text-lg font-semibold text-app-green flex items-center gap-2 px-2">
              <ShieldIcon className="size-5 text-green-900" /> Dashboard
            </h2>
          </div>
          <nav className="flex flex-col gap-1.5">
            {
              filterLinkData.map((link) => <NavLink key={link.to} to={link.to} end className={({ isActive }) => `
                flex items-center gap-3 p-2.5 rounded-md text-sm transition-colors  ${isActive ? "bg-app-green text-white" : "text-app-text-light hover:bg-orange-50 hover:text-zinc-900"}
                `}>
                <link.icon className="size-4" />  {link.label}
              </NavLink>)
            }
          </nav>

        </aside>

        {/* main content */}
        <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;
