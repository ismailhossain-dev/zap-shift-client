import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Payment = () => {
  //route teke id ta nisi
  const { parcelId } = useParams();
  console.log(parcelId);
  //axios use
  const axiosSecure = useAxiosSecure();
  //tanstack query use and w:query function
  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
  console.log(parcel);

  //loading set
  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <span className="loading loading-infinite loading-xl"></span>
      </div>
    );
  }

  // payment work stripe and tanstack query
  const handlePayment = async () => {
    // amra backend ki ki use korsi seta ekane ditesi backend teke deke
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };

    const res = await axiosSecure.post("/create-checkout-Session", paymentInfo);
    //data axios teke default bave day
    console.log(res.data);
    //akane navigation korle kaj korbe na ekane use korthe hobe location
    window.location.href = res.data.url;
  };

  return (
    <div>
      <h2>
        Please Pay for ${parcel.cost} : {parcel.parcelName}{" "}
      </h2>
      <button onClick={handlePayment} className="btn btn-primary text-black">
        Pay
      </button>
    </div>
  );
};

export default Payment;
