import { Loader2Icon } from "lucide-react";
import React from "react";
import CircleLoader from "react-spinners/CircleLoader";
const Loading = () => {
  return (
    <div className="flex-center min-h-120 h-full w-full">
      <Loader2Icon className="animate-spin size-8 text-app-orange" />
    </div>
  );
};

export default Loading;
