import React, { useEffect, useState } from "react";
import { IoSunny, IoMoon } from "react-icons/io5";

const Theme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isDark, setIsDark] = useState(theme === "dark");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setIsDark(checked);
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="flex items-center">
      <label
        className="flex items-center cursor-pointer gap-3 px-4 py-2 rounded-xl hover:bg-primary/10 transition-colors duration-200 group"
        title="Toggle dark/light theme"
      >
        {/* Sun Icon */}
        <IoSunny
          className={`text-lg transition-all duration-300 group-hover:scale-110 ${
            isDark
              ? "text-base-content/50 opacity-50"
              : "text-amber-500 drop-shadow-md"
          }`}
        />

        {/* Toggle Switch */}
        <input
          onChange={(e) => handleTheme(e.target.checked)}
          type="checkbox"
          checked={isDark}
          className="toggle toggle-sm toggle-primary transition-all duration-300"
          aria-label="Toggle theme"
        />

        {/* Moon Icon */}
        <IoMoon
          className={`text-lg transition-all duration-300 group-hover:scale-110 ${
            isDark
              ? "text-cyan-400 drop-shadow-md"
              : "text-base-content/50 opacity-50"
          }`}
        />
      </label>
    </div>
  );
};

export default Theme;
