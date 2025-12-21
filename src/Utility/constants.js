export const STATUS_CONFIG = {
  pending: { icon: "MdOutlinePendingActions", color: "text-yellow-600" },
  rejected: { icon: "MdCancel", color: "text-red-500" },
  "in-progress": { icon: "AiOutlineLoading3Quarters", color: "text-blue-600" },
  working: { icon: "FaPersonRunning", color: "text-pink-600" },
  resolved: { icon: "MdOutlineTaskAlt", color: "text-green-600" },
  closed: { icon: "MdLockOutline", color: "text-gray-500" },
};

export const ISSUE_CATEGORIES = [
  "Road & Potholes",
  "Streetlights",
  "Water Leakage",
  "Garbage & Waste",
  "Drainage",
  "Footpath & Sidewalk",
  "Electricity",
  "Public Safety",
  "Traffic Signal",
  "Other",
];
