import React from "react";
export const CapitalizeFirstLetter = (text = "") => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
