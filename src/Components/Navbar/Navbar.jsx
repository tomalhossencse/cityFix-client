import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import Container from "../../Utility/Container";
import User from "../User/User";
import Theme from "../Theme/Theme";
import { FaHome, FaExclamationTriangle, FaChartLine } from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkStyles = ({ isActive }) =>
    `relative px-3 py-2 transition-all duration-300 font-medium flex items-center gap-2 group ${
      isActive ? "text-primary" : "text-base-content/80 hover:text-primary"
    }`;

  const mobileNavLinkStyles = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
      isActive
        ? "bg-primary/10 text-primary"
        : "text-base-content/80 hover:bg-base-300/50"
    }`;

  const links = (
    <>
      <li>
        <NavLink
          className={navLinkStyles}
          to="/"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FaHome className="text-lg" />
          <span>Home</span>
          <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-12"></span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={navLinkStyles}
          to="/all-issues"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FaExclamationTriangle className="text-lg" />
          <span>All Issues</span>
          <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-12"></span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={navLinkStyles}
          to="/dashboard"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FaChartLine className="text-lg" />
          <span>Dashboard</span>
          <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-12"></span>
        </NavLink>
      </li>
    </>
  );

  const mobileLinks = (
    <>
      <li>
        <NavLink
          className={mobileNavLinkStyles}
          to="/"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FaHome className="text-lg" />
          <span>Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={mobileNavLinkStyles}
          to="/all-issues"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FaExclamationTriangle className="text-lg" />
          <span>All Issues</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={mobileNavLinkStyles}
          to="/dashboard"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FaChartLine className="text-lg" />
          <span>Dashboard</span>
        </NavLink>
      </li>
      <div className="divider my-2"></div>
      <li className="px-3 py-2">
        <Theme />
      </li>
    </>
  );

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-base-100/95 backdrop-blur-xl shadow-lg border-b border-base-300/50"
          : "bg-base-100/80 backdrop-blur-lg border-b border-white/10"
      }`}
    >
      <Container>
        <div className="navbar min-h-20 px-4 lg:px-6">
          {/* Navbar Start - Logo and Mobile Menu */}
          <div className="navbar-start gap-4">
            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="btn btn-ghost btn-circle btn-sm hover:bg-base-300/50 active:bg-transparent focus:bg-transparent"
                aria-label="Toggle navigation menu"
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Logo */}
            <NavLink
              to="/"
              className="flex items-center gap-2 group hover:no-underline"
            >
              <img
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-110"
                src="https://i.ibb.co.com/vxJsgvYj/Asset-1.png"
                alt="CityFix Logo"
              />
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:inline">
                CityFix
              </span>
            </NavLink>
          </div>

          {/* Navbar Center - Desktop Menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-2 flex-nowrap">
              {links}
            </ul>
          </div>

          {/* Navbar End - User and Theme */}
          <div className="navbar-end gap-3 lg:gap-4">
            {/* Desktop Theme Toggle */}
            <div className="hidden md:flex items-center">
              <Theme />
            </div>
            {/* User Menu */}
            <User />
          </div>
        </div>
      </Container>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-base-300/50 bg-base-100/95 backdrop-blur-lg">
          <Container>
            <ul className="menu menu-vertical px-4 py-4 space-y-2">
              {mobileLinks}
            </ul>
          </Container>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
