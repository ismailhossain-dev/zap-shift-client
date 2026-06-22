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

  // TanStack Query (Data Fetching)
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // Parcel Delete Handler
  const handleParcelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5", // Indigo-600 থিম কালার
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: "#ffffff",
      customClass: {
        popup: "rounded-3xl font-sans",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel request has been deleted.",
              icon: "success",
              confirmButtonColor: "#4f46e5",
            });
          }
        });
      }
    });
  };

  // Stripe Payment Checkout Handler
  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };

    const res = await axiosSecure.post("/payment-checkout-session", paymentInfo);
    window.location.assign(res.data.url);
  };

  // ডেলিভারি স্ট্যাটাস অনুযায়ী ব্যাজ কালার জেনারেটর
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "in transit":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "pending":
        return "bg-rose-50 text-rose-600 border-rose-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-10 bg-slate-50/50 min-h-screen w-full max-w-[1400px] mx-auto space-y-8 font-sans antialiased">
      
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm shadow-slate-100/50">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
            My Booked Parcels
          </h1>
          <p className="text-slate-400 text-sm font-medium mt-1">
            Manage your booked shipments, check current status, or complete pending payments.
          </p>
        </div>
        <div className="bg-indigo-50 text-indigo-600 font-bold px-4 py-2 rounded-xl text-sm border border-indigo-100">
          Total Shipments: {parcels.length}
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        
        {parcels.length === 0 ? (
          /* Empty State if no parcels found */
          <div className="p-16 text-center space-y-4">
            <div className="inline-flex p-4 bg-slate-50 rounded-2xl text-slate-400 text-3xl">
              📦
            </div>
            <h3 className="text-lg font-bold text-slate-700">No parcels found</h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto">
              You haven't booked any parcel shipment requests yet. Click "Book New Shipment" from dashboard to get started.
            </p>
          </div>
        ) : (
          /* Data Table Container */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-slate-400 uppercase text-[10px] font-bold tracking-widest border-b border-slate-100">
                  <th className="px-6 py-4 text-center w-16">#</th>
                  <th className="px-6 py-4">Parcel Details</th>
                  <th className="px-6 py-4">Cost (BDT)</th>
                  <th className="px-6 py-4">Payment Status</th>
                  <th className="px-6 py-4">Delivery Status</th>
                  <th className="px-6 py-4 text-center w-48">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/60">
                {parcels.map((parcel, index) => (
                  <tr key={parcel._id} className="hover:bg-slate-50/40 transition-colors group">
                    
                    {/* Index Number */}
                    <td className="px-6 py-4 text-center text-sm font-bold text-slate-400">
                      {index + 1}
                    </td>

                    {/* Parcel Name */}
                    <td className="px-6 py-4 font-bold text-slate-800 text-sm">
                      <span className="block">{parcel.parcelName}</span>
                      <span className="text-[10px] text-slate-400 font-medium block mt-0.5">ID: {parcel._id?.slice(-8).toUpperCase()}</span>
                    </td>

                    {/* Cost */}
                    <td className="px-6 py-4 font-black text-slate-700 text-sm">
                      ৳ {parcel.cost}
                    </td>

                    {/* Payment Status (Paid / Pay Button) */}
                    <td className="px-6 py-4">
                      {parcel.paymentStatus === "paid" ? (
                        <span className="inline-flex items-center px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-xs font-bold uppercase tracking-wide">
                          Paid
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePayment(parcel)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-all hover:-translate-y-0.5 shadow-sm active:translate-y-0"
                        >
                          Pay Now
                        </button>
                      )}
                    </td>

                    {/* Delivery Status */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide border ${getStatusBadge(parcel.deliveryStatus)}`}>
                        {parcel.deliveryStatus || "Pending"}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        
                        {/* Search / View Icon */}
                        <button className="p-2.5 rounded-xl border border-slate-100 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 text-slate-400 transition-all text-base shadow-sm bg-white" title="Track Progress">
                          <HiMiniMagnifyingGlass />
                        </button>
                        
                        {/* Edit Icon */}
                        <button className="p-2.5 rounded-xl border border-slate-100 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-100 text-slate-400 transition-all text-base shadow-sm bg-white" title="Edit Order">
                          <FaRegEdit />
                        </button>
                        
                        {/* Delete Icon */}
                        <button
                          onClick={() => handleParcelDelete(parcel._id)}
                          className="p-2.5 rounded-xl border border-slate-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 text-slate-400 transition-all text-base shadow-sm bg-white"
                          title="Cancel Order"
                        >
                          <MdDelete />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyParcels;