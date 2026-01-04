import React from "react";

const TailwindButton = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <button
        className="
          px-8 py-3
          rounded-full
          text-white font-semibold
          bg-blue-600
          transition-all duration-300 ease-in-out
          hover:bg-blue-700
          hover:scale-110
          active:scale-95
          shadow-lg
        "
      >
        Click Me 🚀
      </button>
    </div>
  );
};

export default TailwindButton;
