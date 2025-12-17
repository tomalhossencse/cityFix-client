import React from "react";
import { NavLink } from "react-router";
import Container from "../../Utility/Container";
import User from "../User/User";
import Theme from "../Theme/Theme";

const Navbar = () => {
  const links = (
    <>
      <li className="mr-4">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="mr-4">
        <NavLink to="/all-issues">All Issues</NavLink>
      </li>
      <li className="mr-4">
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>

      <li className="mr-4">
        <Theme />
      </li>
    </>
  );

  return (
    <div className="shadow-md bg-base-100 fixed w-full glass-card top-0 z-20 md:px-0 px-4">
      <Container>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>
            <a className="btn btn-ghost flex justify-between items-center font-bold text-2xl">
              <img
                className="h-12"
                src="https://i.ibb.co.com/vxJsgvYj/Asset-1.png"
                alt=""
              />{" "}
              CityFix
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>
          <User />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
