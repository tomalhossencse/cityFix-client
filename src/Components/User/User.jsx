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
          title: "Logout Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="navbar-end gap-3">
      {user ? (
        <div className="dropdown dropdown-end z-50">
          <button
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary/50 transition-all duration-300"
            aria-label="User menu"
          >
            <div className="w-10 border-2 border-primary/50 rounded-full overflow-hidden">
              <img
                alt="User avatar"
                referrerPolicy="no-referrer"
                src={
                  user.photoURL ||
                  "https://img.icons8.com/3d-fluent/100/user-2.png"
                }
                className="w-full h-full object-cover"
              />
            </div>
          </button>

          {/* Dropdown Menu */}
          <div
            tabIndex={0}
            className="dropdown-content menu bg-base-100/95 backdrop-blur-lg rounded-lg shadow-xl border border-base-300/50 mt-3 w-56 p-2 z-50"
          >
            {/* User Info Section */}
            <div className="px-4 py-3 border-b border-base-300/50">
              <p className="text-sm font-bold text-base-content truncate">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs text-base-content/70 truncate">
                {user?.email}
              </p>
            </div>

            {/* Menu Items */}
            <li className="mt-2">
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary/10 transition-colors duration-200"
              >
                <FaUser className="text-primary text-lg" />
                <span>View Profile</span>
              </Link>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 rounded-md bg-error/10 text-error hover:bg-error/20 transition-all duration-200 font-medium"
              >
                <IoLogOut className="text-lg" />
                <span>Logout</span>
              </button>
            </li>
          </div>
        </div>
      ) : (
        <Link
          to="/login"
          className="btn btn-sm bg-primary hover:bg-primary-focus text-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 font-medium gap-2"
        >
          <IoLogIn className="text-lg" />
          <span>Login</span>
        </Link>
      )}
    </div>
  );
};

export default User;
