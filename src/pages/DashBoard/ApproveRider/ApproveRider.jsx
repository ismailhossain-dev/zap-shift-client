import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserCheck } from "react-icons/fa6";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
//v:8: 7:30second porjontho deksi
const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();
  //eye modal useState
  const [selectedRider, setSelectedRider] = useState(null);

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

  //approve rider delete related apis
  const handleRiderDelete = (id) => {
    axiosSecure.delete(`/riders/${id}`).then((result) => {
      console.log(result);
      if (result.data.deletedCount) {
        Swal.fire({
          title: "Rider data delete !",
          icon: "success",
        });
        refetch();
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
                  {/* my work */}
                  <div>
                    <button onClick={() => setSelectedRider(rider)} className="cursor-pointer">
                      <LuEye size={30} />
                    </button>
                  </div>

                  <button className="cursor-pointer" onClick={() => handleApproval(rider)}>
                    <FaUserCheck size={30} />
                  </button>
                  <button onClick={() => handleRejected(rider)} className="cursor-pointer">
                    <IoPersonRemoveSharp size={30} />
                  </button>
                  <button onClick={() => handleRiderDelete(rider._id)} className="cursor-pointer">
                    <FaTrashAlt size={25} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Eye modal */}
        {selectedRider && (
          <dialog open className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Name :{selectedRider.riderName}</h3>

              <p>Email: {selectedRider.riderEmail}</p>
              <p>License Number: {selectedRider.licenseNumber}</p>
              <p>NID NO: {selectedRider.riderNID}</p>
              <p>Region: {selectedRider.riderRegion}</p>
              <p>District: {selectedRider.riderDistrict}</p>
              <p>Phone Number: {selectedRider.riderPhoneNumber}</p>
              <p>Bike Registration Number: {selectedRider.riderBikeRegistrationNumber}</p>
              <p>Bike Model Year: {selectedRider.riderBikeModeYear}</p>
              <p>Rider About Yourself: {selectedRider.riderTellAboutYourself}</p>
              <p>Status: {selectedRider.status}</p>
              <p>Time: {selectedRider.createAt}</p>
              <div className="modal-action">
                <button onClick={() => setSelectedRider(null)} className="btn">
                  Close
                </button>
              </div>
            </div>
          </dialog>
        )}

        {/*  */}
      </div>
    </div>
  );
};

export default ApproveRider;
