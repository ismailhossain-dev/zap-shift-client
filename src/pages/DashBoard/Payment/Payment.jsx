import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";
const Payment = () => {
  //jhankar vai code

  //jhankar vai code
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    console.log(res.data);

    window.location.href = res.data.url;
  };

  if (isLoading) {
    return (
      <div>
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  // const { parcelId } = useParams();
  // const axiosSecure = useAxiosSecure();

  // //tanstack query mardome data fetch
  // const { isLoading, data: parcel } = useQuery({
  //   queryKey: ["parcels", parcelId],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/parcels/${parcelId}`);
  //     return res.data;
  //   },
  // });
  // console.log(parcel);

  // const handlePayment = async () => {
  //   const paymentInfo = {
  //     cost: parcel.cost,
  //     parcelId: parcel._id,
  //     senderEmail: parcel.senderEmail,
  //     parcelName: parcel.parcelName,
  //   };

  //   console.log("cheek payment info", paymentInfo);
  //   //paymentInfo data golo backend pataitesi ekane access korar jorno
  //   const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

  //   console.log(res.data);
  //   if (res.data.url) {
  //     window.location.href = res.data.url;
  //   }
  // };

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <div>
      <h2>
        Please Pay ${parcel.cost} for : {parcel.parcelName}{" "}
      </h2>
      <button onClick={handlePayment} className="btn btn-primary text-black">
        Pay
      </button>
    </div>
  );
};

export default Payment;
