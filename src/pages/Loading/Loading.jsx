import React from "react";
import { FadeLoader } from "react-spinners";
// react spinner
const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
      <FadeLoader color="blue"></FadeLoader>
    </div>
  );
};

export default Loading;
