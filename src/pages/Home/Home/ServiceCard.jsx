import React from "react";
import * as FaIcons from "react-icons/fa";

const ServiceCard = ({ services }) => {
  const { title, description, icon } = services;

  // স্ট্রিং নাম থেকে সঠিক আইকন কম্পোনেন্টটি খুঁজে বের করা হচ্ছে
  const IconComponent = FaIcons[icon];

  return (
    <div className="group relative flex justify-center items-center h-full perspective-1000">
      {/* Main Card */}
      <div className="relative overflow-hidden bg-white/80 backdrop-blur-md text-center rounded-[2.5rem] p-10 h-[430px] w-full transition-all duration-500 ease-out flex flex-col items-center justify-center border border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:bg-[#03373d]/90 hover:shadow-[0_20px_50px_rgba(202,235,102,0.25)] hover:-translate-y-3">
        
        {/* Background Radial Glow Effect on Hover */}
        <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(202,235,102,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          
          {/* 3D Icon Container with Neon Soft Glow */}
          <div className="mb-6 p-6 rounded-full bg-gradient-to-br from-[#caeb66] to-[#a3c942]/80 text-[#03373d] text-4xl shadow-[0_10px_20px_rgba(202,235,102,0.3)] transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_30px_rgba(202,235,102,0.6)]">
            {IconComponent ? <IconComponent /> : <FaIcons.FaBox />}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-extrabold text-slate-800 mb-4 group-hover:text-white transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-slate-500 text-sm md:text-base group-hover:text-slate-300 leading-relaxed transition-colors duration-300 line-clamp-4 px-2">
            {description}
          </p>

          {/* Dynamic Action Button matching the Image */}
          <div className="mt-8 transform transition-all duration-500 opacity-80 group-hover:opacity-100">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#03373d] text-white text-xl font-bold shadow-md transition-all duration-300 border border-transparent group-hover:bg-[#caeb66] group-hover:text-[#03373d] group-hover:scale-110">
              →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;