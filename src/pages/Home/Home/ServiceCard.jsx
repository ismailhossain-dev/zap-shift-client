import React from "react";
import service from "../../../assets/service/service.png";
const ServiceCard = ({ services }) => {
  const { title, description } = services;
  return (
    <div className="flex justify-center items-center ">
      <div className=" shadow-lg  bg-white text-center rounded-lg p-15 h-[352px] hover:bg-[#caeb66] duration-300">
        <img src={service} alt="" className="mx-auto" />
        <h3 className="text-[24px] font-bold text-black">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
