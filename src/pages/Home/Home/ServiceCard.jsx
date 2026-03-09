import React from "react";
import serviceIcon from "../../../assets/service/service.png";

const ServiceCard = ({ services }) => {
  const { title, description } = services;

  return (
    <div className="group relative flex justify-center items-center h-full">
      {/* Main Card */}
      <div className="relative overflow-hidden bg-white text-center rounded-[2rem] p-10 h-[400px] w-full shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 flex flex-col items-center justify-center border border-slate-50">
        {/* Background Decorative Element (Hover e color change hobe) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#caeb66] to-[#b8d955] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content Container */}
        <div className="relative z-10">
          {/* Image with Floating Animation */}
          <div className="mb-8 transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
            <img
              src={serviceIcon}
              alt={title}
              className="mx-auto w-18 h-18 object-contain drop-shadow-xl"
            />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-extrabold text-slate-800 mb-4 group-hover:text-black transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-slate-500 group-hover:text-black/80 leading-relaxed transition-colors duration-300">
            {description}
          </p>

          {/* Learn More or Arrow (Optional but looks professional) */}
          <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
            <span className="inline-block w-8 h-8 rounded-full bg-black text-white leading-8 text-center text-sm">
              →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
