import React from "react";

export const DateFormat = (date) =>
  new Date(date).toLocaleString("en-US", {
    timeZone: "Asia/Dhaka",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    hour12: true,
  });
