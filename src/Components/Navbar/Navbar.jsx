import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import Container from "../../Utility/Container";
import User from "../User/User";
import Theme from "../Theme/Theme";
import { FaHome, FaExclamationTriangle, FaChartLine } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkStyles = ({ isActive }) =>
    `relative px-4 py-2 transition-all duration-300 font-bold flex items-center gap-2 group text-sm md:text-base uppercase tracking-wider ${
      isActive ? "text-primary" : "text-base-content/70 hover:text-primary"
    }`;

  const mobileNavLinkStyles = ({ isActive }) =>
    `flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300 ${
      isActive
        ? "bg-primary text-primary-content shadow-lg shadow-primary/20"
        : "text-base-content/80 hover:bg-base-200"
    }`;

  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/all-issues", label: "Issues", icon: <FaExclamationTriangle /> },
    { to: "/dashboard", label: "Dashboard", icon: <FaChartLine /> },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-base-100/80 backdrop-blur-xl shadow-2xl py-0 border-b border-primary/20"
          : "bg-transparent py-2"
      }`}
    >
      <Container>
        <div className="navbar min-h-[72px] px-0">
          {/* --- Navbar Start --- */}
          <div className="navbar-start">
            <div className="lg:hidden mr-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="btn btn-ghost btn-circle hover:bg-primary/10 transition-colors"
              >
                <motion.div
                  animate={isMobileMenuOpen ? "open" : "closed"}
                  className="flex flex-col gap-1.5 items-center justify-center"
                >
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 7 },
                    }}
                    className="w-6 h-0.5 bg-current rounded-full"
                  />
                  <motion.span
                    variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                    className="w-6 h-0.5 bg-current rounded-full"
                  />
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -7 },
                    }}
                    className="w-6 h-0.5 bg-current rounded-full"
                  />
                </motion.div>
              </button>
            </div>

            <NavLink to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  className="h-10 w-auto transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                  src="https://i.ibb.co.com/vxJsgvYj/Asset-1.png"
                  alt="CityFix Logo"
                />
                <div className="absolute inset-0 bg-primary blur-2xl opacity-0 group-hover:opacity-30 transition-opacity" />
              </div>
              <span className="font-black text-2xl tracking-tighter bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent hidden sm:inline">
                CityFix
              </span>
            </NavLink>
          </div>

          {/* --- Navbar Center (Desktop) --- */}
          <div className="navbar-center hidden lg:flex">
            <ul className="flex items-center gap-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink className={navLinkStyles} to={link.to}>
                    <span className="text-lg opacity-80">{link.icon}</span>
                    <span>{link.label}</span>
                    {/* Modern underline effect */}
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                    />
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Navbar End --- */}
          <div className="navbar-end gap-3">
            <div className="hidden md:block">
              <Theme />
            </div>
            <div className="h-10 w-[1px] bg-base-content/10 hidden md:block" />
            <User />
          </div>
        </div>
      </Container>

      {/* --- Mobile Menu (Motion) --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-base-100/95 backdrop-blur-2xl border-t border-primary/10 overflow-hidden"
          >
            <Container>
              <ul className="flex flex-col gap-2 p-6">
                {navLinks.map((link) => (
                  <motion.li
                    key={link.to}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                  >
                    <NavLink
                      className={mobileNavLinkStyles}
                      to={link.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-xl">{link.icon}</span>
                      <span className="text-lg">{link.label}</span>
                    </NavLink>
                  </motion.li>
                ))}
                <div className="divider opacity-50" />
                <div className="flex justify-between items-center px-4 md:hidden">
                  <span className="font-bold opacity-70">Switch Theme</span>
                  <Theme />
                </div>
              </ul>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
