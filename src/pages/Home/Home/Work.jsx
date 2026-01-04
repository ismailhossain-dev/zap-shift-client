import React, { use } from "react"; // only for React Server Components
import WorkCard from "./WorkCard";
import { FaBoxOpen, FaHeadset, FaLocationDot, FaTruckFast } from "react-icons/fa6";
// import { FaTruckFast, FaBoxOpen, FaLocationDot, FaHeadset } from "react-icons/fa";

const Work = ({ workPromise }) => {
  const workData = use(workPromise);

  // Map string names from JSON to actual icon components
  const iconMap = {
    FaTruckFast: FaTruckFast,
    FaBoxOpen: FaBoxOpen,
    FaLocationDot: FaLocationDot,
    FaHeadset: FaHeadset,
  };

  return (
    <div className="my-10">
      <h1 className="text-[32px] font-bold mb-6">How it Works</h1>
      <div className="grid grid-cols-1 gap-6 mx-auto md:grid-cols-2 lg:grid-cols-4">
        {workData.map((work) => {
          const IconComponent = iconMap[work.icon]; // pick the right icon
          return (
            <WorkCard
              key={work.id}
              work={work}
              icon={IconComponent ? <IconComponent /> : null} // render JSX
            />
          );
        })}
      </div>
    </div>
  );
};

export default Work;
