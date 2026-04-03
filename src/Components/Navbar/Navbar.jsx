import React from "react";
import { NavLink } from "react-router";
import Container from "../../Utility/Container";
import User from "../User/User";
import Theme from "../Theme/Theme";

const Navbar = () => {
  const navLinkStyles = ({ isActive }) =>
    `relative px-3 py-2 transition-all duration-300 font-medium hover:text-primary ${
      isActive
        ? "text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
        : "text-base-content/80"
    }`;

  const links = (
    <>
      <li className="mx-1">
        <NavLink className={navLinkStyles} to="/">
          Home
        </NavLink>
      </li>
      <li className="mx-1">
        <NavLink className={navLinkStyles} to="/all-issues">
          All Issues
        </NavLink>
      </li>
      <li className="mx-1">
        <NavLink className={navLinkStyles} to="/dashboard">
          Dashboard
        </NavLink>
      </li>

      <li className="ml-4 flex items-center">
        <Theme />
      </li>
    </>
  );

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/10 backdrop-blur-md bg-base-100/70">
      <Container>
        <div className="navbar min-h-16">
          <div className="navbar-start">
            {/* mobile menu */}
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden focus:bg-transparent active:bg-transparent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100/90 backdrop-blur-lg rounded-2xl z-1 mt-3 w-52 p-4 shadow-xl border border-white/10 "
              >
                {links}
              </ul>
            </div>

            {/* logo */}
            <NavLink to={"/"} className="flex items-center gap-2 group">
              <img
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-110"
                src="https://i.ibb.co.com/vxJsgvYj/Asset-1.png"
                alt="CityFix Logo"
              />
              <span className="font-extrabold  text-2xl tracking-tight bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                CityFix
              </span>
            </NavLink>
          </div>

          {/* desktop menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
          </div>
          <div className="navbar-end">
            <User />
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
