import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserCheck } from "react-icons/fa6";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
//v:8: 7:30second porjontho deksi
const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();
  const { data: riders = [], refetch } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });
  //update work //ei function mardome  pending teke approve korthe partechi
  //amra full rider take database send kore ditesi and amra userCollection teke role change rider kore ditechi
  const handleApproval = (rider) => {
    //ekane userCollection er email ta set korchi jathe approve hole role ta rider kore dithe pari
    const updateInfo = { status: "approve", email: rider.riderEmail };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Rider has been approved",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  //button 2 rejected work
  const handleRejected = (rider) => {
    const authInfo = { status: "rejected", email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, authInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Rider has been approved",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-5xl">Riders Pending Approval: {riders.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>District</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.riderName}</td>
                <td>{rider.riderEmail}</td>
                <td
                  className={`${rider.status === "approve" ? "text-green-700 font-bold" : "text-red-500 "} `}
                >
                  {rider.status}
                </td>
                <td>{rider.riderDistrict}</td>
                <td className="flex gap-3 items-center">
                  <button className="cursor-pointer" onClick={() => handleApproval(rider)}>
                    <FaUserCheck size={30} />
                  </button>
                  <button onClick={() => handleRejected(rider)} className="cursor-pointer">
                    <IoPersonRemoveSharp size={30} />
                  </button>
                  <button className="cursor-pointer">
                    <FaTrashAlt size={25} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRider;
