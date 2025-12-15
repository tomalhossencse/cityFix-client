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

const DashboardLayout = () => {
  const { user, loading } = useContext(AuthContext);
  const { role, isLoading: roleLoading } = useRole();
  if (loading || roleLoading) {
    return <Loading />;
  }
  // console.log(role);
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-base-200">
          {/* Navbar */}
          <nav className="navbar flex justify-between w-full bg-base-100">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <RiMenu2Line size="22" />
            </label>

            <div className="flex items-center justify-start mr-[10%]">
              <div>
                <User />
              </div>
              <div>
                <p className="text-primary text-xl font-bold">
                  {CapitalizeFirstLetter(user.displayName)}
                </p>
                <p className="text-[12px]">{user.email}</p>
              </div>
            </div>
          </nav>
          {/* Page content here  */}
          <Outlet />
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full is-drawer-open:px-2 is-drawer-close:px-0 items-start flex-col text-accent bg-base-100 is-drawer-close:w-20 is-drawer-open:w-56">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* home */}
              <li className="pb-2">
                <Link
                  to={"/"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-2"
                  data-tip="Home"
                >
                  {/* Home icon */}
                  <img
                    src="https://i.ibb.co.com/vxJsgvYj/Asset-1.png"
                    className="h-7"
                    alt=""
                  />
                  <span className="is-drawer-close:hidden font-bold text-2xl">
                    CityFix
                  </span>
                </Link>
              </li>
              {/* dashboard home */}
              <li className="p-2">
                <NavLink
                  to={"/dashboard"}
                  end
                  className={({ isActive }) =>
                    `gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right 
     ${isActive ? "text-primary font-bold bg-base-200 rounded-md" : ""}`
                  }
                  data-tip="Homepage"
                >
                  {/* DashboardHome icon */}
                  <MdOutlineDashboardCustomize size={20} />

                  <span className="is-drawer-close:hidden">Dashboard</span>
                </NavLink>
              </li>
              {/* -------------Citizen----------------- */}

              {role === "citizen" && (
                <>
                  {/* my issues */}
                  <li className="p-2">
                    <NavLink
                      to={"/dashboard/my-issues"}
                      className={({ isActive }) =>
                        `gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right 
     ${isActive ? "text-primary font-bold bg-base-200 rounded-md" : ""}`
                      }
                      data-tip="My Issues "
                    >
                      {/* dashboard icon */}
                      <AiOutlineIssuesClose size={20} />

                      <span className="is-drawer-close:hidden">My Issues </span>
                    </NavLink>
                  </li>

                  {/* report issues */}
                  <li className="p-2">
                    <NavLink
                      to={"/dashboard/report-issues"}
                      className={({ isActive }) =>
                        `gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right 
     ${isActive ? "text-primary font-bold bg-base-200 rounded-md" : ""}`
                      }
                      data-tip="Report Issues "
                    >
                      {/* report icon */}
                      <TbReport size={20} />

                      <span className="is-drawer-close:hidden">
                        Report Issue
                      </span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* profile */}
              <li className="p-2">
                <NavLink
                  to={"/dashboard/profile"}
                  className={({ isActive }) =>
                    `gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right 
     ${isActive ? "text-primary font-bold bg-base-200 rounded-md" : ""}`
                  }
                  data-tip="My Profile"
                >
                  {/* report icon */}
                  <FaRegUser size={20} />

                  <span className="is-drawer-close:hidden">My Profile</span>
                </NavLink>
              </li>

              {/* ----------------Admin dashboard navlink--------------- */}

              {role === "admin" && (
                <>
                  {/* All Issues */}
                  <li className="p-2">
                    <NavLink
                      to={"/dashboard/all-issues"}
                      className={({ isActive }) =>
                        `gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right 
     ${isActive ? "text-primary font-bold bg-base-200 rounded-md" : ""}`
                      }
                      data-tip="All Issues"
                    >
                      {/* report icon */}
                      <RiCheckboxMultipleFill size={20} />

                      <span className="is-drawer-close:hidden">All Issues</span>
                    </NavLink>
                  </li>

                  {/* Manage Users */}
                  <li className="p-2">
                    <NavLink
                      to={"/dashboard/manage-users"}
                      className={({ isActive }) =>
                        `gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right 
     ${isActive ? "text-primary font-bold bg-base-200 rounded-md" : ""}`
                      }
                      data-tip="Manage Users"
                    >
                      {/* report icon */}
                      <FaUsersCog size={24} />
                      <span className="is-drawer-close:hidden">
                        Manage Users
                      </span>
                    </NavLink>
                  </li>

                  {/* Manages Sttaf */}
                  <li className="p-2">
                    <NavLink
                      to={"/dashboard/manage-sttafs"}
                      className={({ isActive }) =>
                        `gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right 
     ${isActive ? "text-primary font-bold bg-base-200 rounded-md" : ""}`
                      }
                      data-tip="Manage Sttafs"
                    >
                      {/* report icon */}
                      <IoPersonAdd size={20} />

                      <span className="is-drawer-close:hidden">
                        Manage Sttafs
                      </span>
                    </NavLink>
                  </li>

                  {/*  Payments */}
                  <li className="p-2">
                    <NavLink
                      to={"/dashboard/payments"}
                      className={({ isActive }) =>
                        `gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right 
     ${isActive ? "text-primary font-bold bg-base-200 rounded-md" : ""}`
                      }
                      data-tip="Payments"
                    >
                      {/* report icon */}
                      <MdPayments size={20} />

                      <span className="is-drawer-close:hidden">Payments</span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* ------------Staff dashboardlink -------------------- */}
              {role === "staff" && (
                <>
                  <li className="p-2">
                    <NavLink
                      to={"/dashboard/assigned-issues"}
                      className={({ isActive }) =>
                        `gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right 
     ${isActive ? "text-primary font-bold bg-base-200 rounded-md" : ""}`
                      }
                      data-tip="Assigned Issues"
                    >
                      {/* report icon */}
                      <MdOutlineAssignmentReturned size={20} />

                      <span className="is-drawer-close:hidden">
                        Assigned Issues
                      </span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
