import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { HiMiniArrowRightOnRectangle } from "react-icons/hi2";
import Container from "../../Utility/Container";
import { AuthContext } from "../../Context/AuthContext";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, userLogOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };
  // console.log(user);

  const links = (
    <>
      <li className="mr-4">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="mr-4">
        <NavLink to="/add-issue">Add New Issue</NavLink>
      </li>
      <li className="mr-4">
        <NavLink to="/all-issues">All Issues</NavLink>
      </li>
      <li className="mr-4">
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      {/* <li className="mr-4">
        <NavLink to="/register">Register</NavLink>
      </li>
      <li className="mr-4">
        <NavLink to="/login">Login</NavLink>
      </li> */}
      <li className="mr-4">
        <NavLink to="/profile">Profile</NavLink>
      </li>

      <li className="mr-4">
        <label className="flex cursor-pointer gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            defaultChecked={localStorage.getItem("theme") === "dark"}
            className="toggle theme-controller"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </li>
    </>
  );

  const handleLogout = () => {
    userLogOut()
      .then(() => {
        navigate("/login");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout Successfull!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
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
          <div className="navbar-end gap-6">
            {user ? (
              <div className="dropdown dropdown-end z-50">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-9 border-2 border-gray-300 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      referrerPolicy="no-referrer"
                      src={
                        user.photoURL ||
                        "https://img.icons8.com/3d-fluent/100/user-2.png"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
                >
                  <div className=" pb-3 border-b border-b-gray-200">
                    <li className="text-sm font-bold">{user.displayName}</li>
                    <li className="text-xs">{user.email}</li>
                  </div>
                  <li className="mt-3">
                    <Link to={"/profile"}>
                      <FaUser /> Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="btn-xs bg-primary text-white font-bold text-md rounded-md shadow-md hover:bg-black transition-transform hover:scale-105"
                    >
                      <IoLogOut /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to={"/login"}
                className="btn btn-sm bg-primary rounded-md shadow-md hover:bg-black transition-transform hover:scale-105  text-white"
              >
                {" "}
                <IoLogIn /> Login
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
