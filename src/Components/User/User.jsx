import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

const User = () => {
  const navigate = useNavigate();
  const { user, userLogOut } = useContext(AuthContext);
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
    <div className="navbar-end gap-6">
      {user ? (
        <div className="dropdown dropdown-end z-50">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 border-2 border-gray-300 rounded-full">
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
            <div className="pb-3 border-b border-b-gray-200">
              <li className="text-sm font-bold">{user?.displayName}</li>
              <li className="text-xs">{user?.email}</li>
            </div>
            <li className="mt-3">
              <Link to={"/dashboard/profile"}>
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
          className="btn btn-sm bg-primary rounded-md shadow-md hover:bg-accent transition-transform hover:scale-105  text-white"
        >
          {" "}
          <IoLogIn /> Login
        </Link>
      )}
    </div>
  );
};

export default User;
