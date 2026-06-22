import React from "react";
import { FaBox, FaTruck, FaCheckCircle, FaPlus, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // 1. TanStack Query (All Parcels Fetching)
  const { data: parcels = [], isLoading: isParcelsLoading } = useQuery({
    queryKey: ["my-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // 2. TanStack Query (Successful Payments Fetching)
  const { data: payments = [], isLoading: isPaymentsLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  // ডাইনামিক পার্সেল স্ট্যাটাস কাউন্টিং
  const totalParcels = parcels.length;
  
  const inTransitParcels = parcels.filter(
    (p) => p.deliveryStatus?.toLowerCase() === "in transit"
  ).length;
  
  const deliveredParcels = parcels.filter(
    (p) => p.deliveryStatus?.toLowerCase() === "delivered"
  ).length;
  
  // 🛠️ ডাইনামিক ফিল্ড ট্র্যাকার (ফিল্ডের নাম price, cost, amount, বা dynamic যাই হোক না কেন ডলার হিসাব করবে)
  const totalPaidAmount = payments.reduce((sum, payment) => {
    const dynamicPriceField = payment.price || payment.cost || payment.amount || payment.totalPaid || 0;
    return sum + (Number(dynamicPriceField) || 0);
  }, 0);

  // ডাইনামিক ডেটা স্ট্যাটাস অ্যারে (ডলার সাইনসহ)
  const stats = [
    { id: 1, title: "My Total Parcels", value: totalParcels, isCurrency: false, icon: <FaBox />, color: "from-blue-500 to-indigo-600" },
    { id: 2, title: "Parcels In Transit", value: inTransitParcels, isCurrency: false, icon: <FaTruck />, color: "from-amber-400 to-orange-500" },
    
    { id: 4, title: "Total Amount Paid", value: totalPaidAmount, isCurrency: true, icon: <FaCreditCard />, color: "from-purple-500 to-pink-600" },
  ];

  // লোডিং স্টেট হ্যান্ডলার (ডাটা আসার আগে যেন ফাকা বা ০ না দেখায়)
  if (isParcelsLoading || isPaymentsLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 lg:p-10 bg-slate-50/50 min-h-screen w-full max-w-[1400px] mx-auto space-y-8 font-sans antialiased">
      
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm shadow-slate-100/50">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
            Welcome back, <span className="text-indigo-600">{user?.displayName || "User"}</span>! 👋
          </h1>
          <p className="text-slate-400 text-sm font-medium mt-1">
            Track your ongoing shipments or book a new parcel delivery instantly.
          </p>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5 active:translate-y-0 font-bold text-sm">
          <FaPlus /> Book New Shipment
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3
       gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white p-6 rounded-2xl border border-slate-100/80 flex items-center gap-5 hover:shadow-xl hover:shadow-slate-100/40 transition-all duration-300 group"
          >
            <div className={`bg-gradient-to-br ${stat.color} p-4 rounded-xl text-white text-2xl shadow-lg transform group-hover:scale-105 transition-transform`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{stat.title}</p>
              <h3 className="text-2xl md:text-3xl font-black text-slate-800 mt-0.5 tracking-tight">
                {stat.isCurrency 
                  ? `$${stat.value.toFixed(2)}` 
                  : String(stat.value).padStart(2, '0')
                }
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* My Recent Orders / Parcels */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-6 border-b border-slate-100/60 flex justify-between items-center">
              <h2 className="text-lg font-black text-slate-800 tracking-tight">My Recent Parcels</h2>
              <button className="text-indigo-600 text-sm font-bold hover:text-indigo-700 hover:underline underline-offset-4 transition-all">
                See All Orders
              </button>
            </div>
            
            <div className="overflow-x-auto">
              {parcels.length === 0 ? (
                <div className="p-12 text-center text-slate-400 font-medium">
                  No parcel bookings available.
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/70 text-slate-400 uppercase text-[10px] font-bold tracking-widest border-b border-slate-100">
                      <th className="px-6 py-4">Tracking ID</th>
                      <th className="px-6 py-4">Delivery Destination</th>
                      <th className="px-6 py-4">Current Status</th>
                      <th className="px-6 py-4">Payment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/60">
                    {parcels.slice(0, 5).map((parcel) => (
                      <tr key={parcel._id} className="hover:bg-slate-50/30 transition-colors group">
                        <td className="px-6 py-4 font-bold text-indigo-600 text-sm group-hover:text-indigo-700 transition-colors">
                          #{parcel._id?.slice(-8).toUpperCase()}
                        </td>
                        <td className="px-6 py-4 text-slate-600 text-sm font-medium">
                          {parcel.deliveryAddress || "Not specified"}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide border ${
                            parcel.deliveryStatus?.toLowerCase() === "delivered" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                            parcel.deliveryStatus?.toLowerCase() === "in transit" ? "bg-amber-50 text-amber-600 border-amber-100" :
                            "bg-rose-50 text-rose-600 border-rose-100"
                          }`}>
                            {parcel.deliveryStatus || "Pending"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {/* পেমেন্ট এপিআই ম্যাপিং কন্ডিশন */}
                          {payments.some((pay) => pay.parcelId === parcel._id) || parcel.paymentStatus?.toLowerCase() === "paid" ? (
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">Paid</span>
                          ) : (
                            <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">Unpaid</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="space-y-6">
          
          {/* Live Tracking Card Widget */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 md:p-8 rounded-2xl shadow-xl shadow-slate-200 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-lg font-black tracking-tight mb-2">Live Tracking</h3>
              <p className="text-indigo-200/80 text-xs font-medium mb-6">
                Enter your parcel tracking code to see real-time delivery status updates.
              </p>
              
              <div className="flex gap-2 bg-white/10 p-1.5 rounded-xl border border-white/10 focus-within:border-indigo-400/50 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                <input
                  type="text"
                  placeholder="e.g. ZAP-12345"
                  className="w-full bg-transparent border-none rounded-lg px-3 py-2 text-white placeholder:text-indigo-300 text-sm font-semibold outline-none"
                />
                <button className="bg-white text-indigo-950 font-bold px-4 rounded-lg hover:bg-indigo-50 transition-colors text-sm shadow-md">
                  Track
                </button>
              </div>
            </div>
            
            <div className="absolute -right-6 -bottom-6 text-white/5 text-9xl transform group-hover:scale-110 transition-transform duration-500 pointer-events-none">
              <FaMapMarkerAlt />
            </div>
          </div>

          {/* Customer Support Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-base font-black text-slate-800 tracking-tight mb-2">Need Support?</h3>
              <p className="text-slate-400 text-xs font-semibold leading-relaxed mb-6">
                Having issues with a booking, pricing, or parcel location? Our team is active to help you right now.
              </p>
            </div>
            <button className="w-full border border-slate-200 hover:border-indigo-600 hover:text-indigo-600 text-slate-600 font-bold py-3 rounded-xl text-sm transition-all bg-white hover:bg-indigo-50/20">
              Chat with Us
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default UserDashboard;