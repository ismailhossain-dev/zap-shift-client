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

  //delete
  const handleParcelDelete = (id) => {
    console.log(id);
    //sweet alert
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
        //delate send parcel data
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log("my parcel data delete", res.data);

          //amra delete alert dekabo jokon deletedCount 1 hobe
          if (res.data.deletedCount) {
            //reload deya chara delete er jorno refetch use korsi
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

  //new stripe work
  const handlePayment = async (parcel) => {
    //backend jeta lagbe seta seta ditesi
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };
    //paymentInfo data gola backend e patary divo
    const res = await axiosSecure.post("/payment-checkout-session", paymentInfo);

    //data axios teke default vabe ase
    // console.log(res.data.url);
    console.log(res.data.url);
    //ekane usenavigation kore payment page jaythe parbo na tai use korhte window.location.href = res.data.url ekane error ditese je sejorno href use kori nai amra use korsi assign
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
                  {parcel.paymentStatus === "paid" ? (
                    <span className="text-green-400">Paid</span>
                  ) : (
                    // Dynamic route and payment page e niye jabe
                    //old
                    // <Link to={`/dashboard/payment/${parcel._id}`}>
                    //   <button className="btn btn-primary btn-sm text-black">Pay</button>
                    // </Link>

                    //new api
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="btn btn-primary btn-sm text-black"
                    >
                      Pay
                    </button>
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
