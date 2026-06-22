import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { ArrowUpRightIcon, ChevronDownIcon, LogOutIcon, MenuIcon, ShieldIcon, UserIcon, XIcon } from "lucide-react";

const User = () => {
  const navigate = useNavigate();
  // const user = {
  //   displayName: "Tomal Hossen",
  //   email: "tomal@gmail.com",
  //   isAdmin: true,
  // };
  const { userLogOut, user } = useContext(AuthContext);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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
    // <div className="navbar-end gap-3">
    //   {user ? (
    //     <div className="dropdown dropdown-end z-50">
    //       <button
    //         tabIndex={0}
    //         role="button"
    //         className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary/50 transition-all duration-300"
    //         aria-label="User menu"
    //       >
    //         <div className="w-10 border-2 border-primary/50 rounded-full overflow-hidden">
    //           <img
    //             alt="User avatar"
    //             referrerPolicy="no-referrer"
    //             src={
    //               user.photoURL ||
    //               "https://img.icons8.com/3d-fluent/100/user-2.png"
    //             }
    //             className="w-full h-full object-cover"
    //           />
    //         </div>
    //       </button>

    //       {/* Dropdown Menu */}
    //       <div
    //         tabIndex={0}
    //         className="dropdown-content menu bg-base-100/95 backdrop-blur-lg rounded-xl shadow-xl border border-primary/20 mt-3 w-56 p-2 z-50"
    //       >
    //         {/* User Info Section */}
    //         <div className="px-4 py-3 border-b border-primary/20">
    //           <p className="text-sm font-bold text-base-content truncate">
    //             {user?.displayName || "User"}
    //           </p>
    //           <p className="text-xs text-base-content/70 truncate">
    //             {user?.email}
    //           </p>
    //         </div>

    //         {/* Menu Items */}
    //         <li className="mt-2">
    //           <Link
    //             to="/dashboard/profile"
    //             className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors duration-200"
    //           >
    //             <FaUser className="text-primary text-lg" />
    //             <span>View Profile</span>
    //           </Link>
    //         </li>

    //         <li>
    //           <button
    //             onClick={handleLogout}
    //             className="flex items-center gap-3 px-3 py-2 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-all duration-200 font-medium"
    //           >
    //             <IoLogOut className="text-lg" />
    //             <span>Logout</span>
    //           </button>
    //         </li>
    //       </div>
    //     </div>
    //   ) : (
    //     <Link
    //       to="/login"
    //       className="btn btn-sm bg-gradient-to-r from-primary to-blue-600 hover:from-primary-focus hover:to-blue-700 text-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 font-semibold gap-2"
    //     >
    //       <IoLogIn className="text-lg" />
    //       <span>Login</span>
    //     </Link>
    //   )}
    // </div>

    <div className="relative">
      {user ? (
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="flex items-center gap-2 p-2"
        >
          <div className="size-7 rounded-full bg-green-950 text-white flex-center">
            {user.displayName.charAt(0).toUpperCase()}

          </div>
          <ChevronDownIcon className="size-3 text-zinc-500" />
        </button>
      ) : (
        <div className="flex-center gap-2">
          <Link to='/login' className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-950 rounded-full hover:bg-green-950 transition-colors">
            Sign in
            <UserIcon size={16} />
          </Link>

          {userMenuOpen ? (
            <XIcon
              className="md:hidden"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            />
          ) : (
            <MenuIcon
              className="md:hidden"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            />
          )}
        </div>
      )}

      {/* user menu */}
      {
        userMenuOpen && (
          <>
            <div onClick={() => setUserMenuOpen(false)} className="fixed inset-0 z-50" />

            <div className="absolute right-0 mt-2.5 w-56 bg-white rounded-xl shadow-lg border-app-border py-2 z-50 animate-fade-in">
              {user && (
                <div className="px-4 py-2 border-b border-app-border">
                  <p className="text-sm font-medium text-zinc-900">{user?.displayName}</p>
                  <p className="text-xs text-zinc-500">{user?.email}</p>
                </div>
              )}

              <div>


                {!user && (
                  <Link to="/login" className="dropdown-link">
                    <UserIcon size={16} />
                    Sign In
                  </Link>
                )}

                <Link to="/all-issues" className="dropdown-link md:hidden">
                  <ArrowUpRightIcon size={16} />
                  All Issues
                </Link>

                {user && (
                  <Link to="/dashboard/profile" className="dropdown-link">
                    <UserIcon size={16} />
                    View Profile
                  </Link>
                )}
                {user && (
                  <Link to="/dashboard" className="dropdown-link text-app-orange-dark">
                    <ShieldIcon
                      className="text-app-orange-dark size-4"

                    />
                    <span className="text-app-orange-dark">Dashboard</span>
                  </Link>
                )}

                {user && (
                  <div className="border-t border-app-border pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-app-error hover:bg-red-50 w-full transition-colors"
                    >
                      <LogOutIcon size={16} /> logout
                    </button>
                  </div>
                )}
              </div>



            </div>
          </>
        )
      }

    </div>
  );
};

export default User;
