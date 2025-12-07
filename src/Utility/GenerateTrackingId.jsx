import React from "react";

export const GenerateTrackingId = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);

  return `ISS-${year}-${random}`;
};
