export const CapitalizeFirstLetter = (text) => {
  if (typeof text !== "string" || !text.length) return ""; // return empty if not string
  return text.charAt(0).toUpperCase() + text.slice(1);
};
