import React from "react";

const WorkCard = ({ work, icon }) => {
  return (
    <div className="group relative bg-white rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2">
      {/* Background Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Animated Icon Container */}
        <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 text-4xl transition-all duration-500 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-6 shadow-inner">
          {icon}
        </div>

        {/* Text Content */}
        <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-indigo-700 transition-colors">
          {work.title}
        </h2>

        <p className="text-slate-600 leading-relaxed font-light">{work.description}</p>

        {/* Bottom Decorative Line */}
        <div className="mt-6 w-12 h-1 bg-indigo-100 rounded-full overflow-hidden">
          <div className="w-0 h-full bg-indigo-600 group-hover:w-full transition-all duration-700" />
        </div>
      </div>

      {/* Subtle Border/Shadow */}
      <div className="absolute inset-0 border border-slate-100 rounded-2xl pointer-events-none group-hover:border-indigo-100 shadow-sm group-hover:shadow-2xl group-hover:shadow-indigo-100/50 transition-all duration-500" />
    </div>
  );
};

export default WorkCard;
