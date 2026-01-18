import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router";
const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // tanstack query use and query function website
  //data ta asche tanstack query teke and data name change kore disi parcels and etar default man set kore disi mt array []

  //refetch korsi reload deya chara delete hoyar jorno
  const { data: parcels = [], refetch } = useQuery({
    // querykey name ta unic dithe hobe jemon email p:4
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      console.log(res);
      // axios default vabe data name dey
      return res.data;
    },
  });
  console.log(parcels);

  //myParcel delete again try id madome
  const handleParcelDelete = (id) => {
    //just amra eta korle id peye jabo and amra id parcel teke paisi paramiter amra jeta mon chai seta dite parbo amra to paraiter acesskortesi delete button teke and amra parametter name sabbir diye o access korthe parbo
    console.log("getting id", id);
    //sweet alert 2

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // id ta astese holo button teke and amra parameter e access kore _id ke id convert korsi
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);

          //jdo res.data te deleteCount  1 add koe tahole nicher alert ta dekebe
          if (res.data.deletedCount) {
            // refresh the data in the ui
            refetch();

            Swal.fire({
              title: "Deleted!",
              text: "Your parcel request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  //my stipe payment handle function
  //amra ekane tanstack quey teke data ta nisi
  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };

    //amra backend e  payment info ta pataitesi
    const res = await axiosSecure.post("/payment-checkout-session", paymentInfo);
    //data ta tanstack query teke automatic ase
    console.log(res.data.url);
    //window location er mardome amra payment page jaytesi
    //eta korle warning ditese tai amra assign use kortesi
    // window.location.href = res.data.url;
    window.location.assign(res.data.url);
  };

  return (
    <div>
      <h2>All of my parcels : {parcels.length}</h2>{" "}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Const</th>
              <th>Payment</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* ekane amra onek sundor kaj koresi  */}
            {/* dynamic  row  */}
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                {/* table no dynamic set  */}
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>
                  {/* first amra backend stripe take updata koresi  */}
                  {/* stipe teke paymentStatus Paid hoy tahole paid dekabe */}
                  {parcel.paymentStatus === "paid" ? (
                    <span className="text-green-400">Paid</span>
                  ) : (
                    //amra ekane teke parcel take patai detesi
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="btn btn-primary btn-sm text-black"
                    >
                      Pay
                    </button>

                    //new api
                    // <button
                    //   onClick={() => handlePayment(parcel)}
                    //   className="btn btn-primary btn-sm text-black"
                    // >
                    //   Pay
                    // </button>
                  )}
                </td>
                <td>{parcel.deliveryStatus}</td>

                <td>
                  {/* search icon */}
                  <button className="btn btn-square hover:btn-primary">
                    <HiMiniMagnifyingGlass />
                  </button>
                  {/* Edit icon */}
                  <button className="btn btn-square mx-2 hover:btn-primary">
                    <FaRegEdit />
                  </button>
                  {/* Delete icon */}
                  {/* amra ekane parcel teke id ta diye dilam */}
                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="btn btn-square hover:btn-primary"
                  >
                    <MdDelete />
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

export default MyParcels;
