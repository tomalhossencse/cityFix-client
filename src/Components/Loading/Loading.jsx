import React from "react";
import CircleLoader from "react-spinners/CircleLoader";
const Loading = () => {
  return (
    <div className="flex justify-center items-center absolute top-1/2 left-1/2">
      <CircleLoader color="#4CAF4F" size={40} />
    </div>
  );
};

export default Loading;
