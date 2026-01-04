import React from "react";

const WorkCard = ({ work, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
      <div className="text-4xl text-blue-500 mb-4">
        {icon} {/* This renders the dynamic icon */}
      </div>
      <h2 className="text-xl font-semibold mb-2">{work.title}</h2>
      <p className="text-gray-600">{work.description}</p>
    </div>
  );
};

export default WorkCard;
