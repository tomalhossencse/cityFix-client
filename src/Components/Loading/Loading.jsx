import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

const Loading = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("https://assets2.lottiefiles.com/packages/lf20_x62chJ.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default Loading;
