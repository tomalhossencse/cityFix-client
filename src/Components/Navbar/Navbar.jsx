// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router";

import { Link, NavLink } from "react-router";
import Container from "../../Utility/Container";

// import User from "../User/User";
import { footerData } from "../../assets/assets";
import { Building2Icon, SearchIcon } from "lucide-react";
import MyNavLink from "../shared/MyNavLink";
import User from "../User/User";
const Navbar = () => {
  // const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  // useEffect(() => {
  //   const html = document.querySelector("html");
  //   html.setAttribute("data-theme", theme);
  //   localStorage.setItem("theme", theme);
  // }, [theme]);

  // const handleTheme = (checked) => {
  //   setTheme(checked ? "dark" : "light");
  // };
  // console.log(user);

  // const links = (
  //   <>
  //     <li className="mr-4">
  //       <NavLink to="/">Home</NavLink>
  //     </li>
  //     <li className="mr-4">
  //       <NavLink to="/all-issues">All Issues</NavLink>
  //     </li>
  //     <li className="mr-4">
  //       <NavLink to="/dashboard">Dashboard</NavLink>
  //     </li>
  //     <li className="mr-4">
  //       <NavLink to="/register">Register</NavLink>
  //     </li>
  //     <li className="mr-4">
  //       <NavLink to="/login">Login</NavLink>
  //     </li>

  //      <li className="mr-4">
  //       <label className="flex cursor-pointer gap-2">
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           width="20"
  //           height="20"
  //           viewBox="0 0 24 24"
  //           fill="none"
  //           stroke="currentColor"
  //           strokeWidth="2"
  //           strokeLinecap="round"
  //           strokeLinejoin="round"
  //         >
  //           <circle cx="12" cy="12" r="5" />
  //           <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  //         </svg>
  //         <input
  //           onChange={(e) => handleTheme(e.target.checked)}
  //           type="checkbox"
  //           defaultChecked={localStorage.getItem("theme") === "dark"}
  //           className="toggle theme-controller"
  //         />
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           width="20"
  //           height="20"
  //           viewBox="0 0 24 24"
  //           fill="none"
  //           stroke="currentColor"
  //           strokeWidth="2"
  //           strokeLinecap="round"
  //           strokeLinejoin="round"
  //         >
  //           <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  //         </svg>
  //       </label>
  //     </li>
  //   </>
  // );

  return (
    <div className="bg-white sticky top-0 z-50 border-b border-app-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center  justify-between h-16 gap-4">
        {/* logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-medium shrink-0"
        >
          <Building2Icon className="size-6 text-app-orange" /> {footerData.brand.name}
        </Link>

        <div className="w-full flex items-center justify-end gap-4 lg:gap-10">
          {/* NavLinks Desktop */}
          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-600">
            <MyNavLink to="/">Home</MyNavLink>
            <MyNavLink to="/all-issues">All Issues</MyNavLink>
            <MyNavLink to="/dashboard">Dashboard</MyNavLink>
          </div>

          {/* search */}
          <form
            // onSubmit={handleSearch}
            className="hidden sm:flex flex-1 max-w-sm text-xs sm:text-sm"
          >
            <div className="relative w-full">
              <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search for groceries..."
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 p-2 bg-orange-50 rounded-full ring ring-app-orange/15 focus:ring-app-orange/30"
              />
            </div>
          </form>

          {/* right */}
          <User />
        </div>

      </div>
    </div>
  );
};

export default Navbar;
