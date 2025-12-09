import React from "react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { RiMenu2Line } from "react-icons/ri";
import { Link, NavLink, Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-base-200">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-100">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <RiMenu2Line size="22" />
          </label>
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
        <div className="flex min-h-full is-drawer-open:px-2 is-drawer-close:px-0 items-start flex-col  bg-base-100 is-drawer-close:w-20 is-drawer-open:w-48">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li className="pb-2 border-b-2 border-base-300">
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
            {/* home */}

            <li className="p-2 mt-2">
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
                {/* DashboardHome icon */}
                <MdOutlineDashboardCustomize size={20} />

                <span className="is-drawer-close:hidden">My Issues </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
