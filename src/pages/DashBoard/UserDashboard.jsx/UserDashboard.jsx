import React from "react";
import { FaBox, FaTruck, FaCheckCircle, FaClock, FaPlus, FaMapMarkerAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const UserDashboard = () => {
  const { user } = useAuth();

  // Dummy Data for Statistics
  const stats = [
    { id: 1, title: "Total Parcels", value: "12", icon: <FaBox />, color: "bg-blue-500" },
    { id: 2, title: "In Transit", value: "03", icon: <FaTruck />, color: "bg-amber-500" },
    { id: 3, title: "Delivered", value: "08", icon: <FaCheckCircle />, color: "bg-green-500" },
    { id: 4, title: "Pending", value: "01", icon: <FaClock />, color: "bg-rose-500" },
  ];

  return (
    <div className="p-6 lg:p-10 bg-slate-50 min-h-screen">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome back, <span className="text-indigo-600">{user?.displayName || "User"}</span>! 👋
          </h1>
          <p className="text-slate-500 mt-1">Here's what's happening with your shipments today.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 font-semibold">
          <FaPlus /> Send New Parcel
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow"
          >
            <div className={`${stat.color} p-4 rounded-xl text-white text-2xl shadow-lg`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Shipments Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">Recent Shipments</h2>
            <button className="text-indigo-600 text-sm font-semibold hover:underline">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase text-xs">
                  <th className="px-6 py-4 font-semibold">Tracking ID</th>
                  <th className="px-6 py-4 font-semibold">Destination</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[1, 2, 3, 4].map((item) => (
                  <tr key={item} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-indigo-600">#ACME-98432{item}</td>
                    <td className="px-6 py-4 text-slate-600 text-sm">Dhaka to Chittagong</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">
                        Delivered
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm">Oct 2{item}, 2023</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Tracking & Support */}
        <div className="space-y-8">
          {/* Tracking Card */}
          <div className="bg-indigo-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4">Track Parcel</h3>
              <p className="text-indigo-200 text-sm mb-6">
                Enter your tracking ID to see live updates.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="ID: 12345..."
                  className="w-full bg-indigo-800 border-none rounded-lg px-4 py-2 text-white placeholder:text-indigo-400 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                <button className="bg-white text-indigo-900 p-2 rounded-lg hover:bg-indigo-50 transition-colors">
                  Go
                </button>
              </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute -right-4 -bottom-4 text-indigo-800 text-8xl opacity-30">
              <FaMapMarkerAlt />
            </div>
          </div>

          {/* Support Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Need Help?</h3>
            <p className="text-slate-500 text-sm mb-6">
              If you have any issues with your delivery, our 24/7 support is here.
            </p>
            <button className="w-full border-2 border-slate-100 hover:border-indigo-600 hover:text-indigo-600 text-slate-600 font-bold py-3 rounded-xl transition-all">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
