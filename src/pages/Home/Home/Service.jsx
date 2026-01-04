import React, { use } from "react";
import ServiceCard from "./ServiceCard";

const Service = ({ servicePromise }) => {
  const serviceData = use(servicePromise);
  return (
    <div className="bg-[#03373d]  rounded-lg  py-[160px] px-[100px]">
      <h1 className="text-[40px] font-semibold text-center text-white">Our Services</h1>
      <p className="text-white mx-auto text-center my-4">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal
        packages to
        <br /> business shipments — we deliver on time, every time.
      </p>
      <div className=" mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {serviceData.map((services) => (
          <ServiceCard key={services.id} services={services}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default Service;
