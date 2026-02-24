import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Payment History</h2>
          <p className="text-gray-500 mt-1">View and manage your recent transactions</p>
        </div>
        <div className="stats shadow bg-white">
          <div className="stat">
            <div className="stat-title">Total Payments</div>
            <div className="stat-value text-primary text-2xl">{payments.length}</div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead className="bg-gray-100/50">
              <tr className="text-gray-700 uppercase text-xs">
                <th className="py-4">#</th>
                <th>Transaction Details</th>
                <th>Amount</th>
                <th>Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payments.map((payment, index) => (
                <tr key={payment._id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="font-medium text-gray-400">{index + 1}</td>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-700">{payment.transactionId}</span>
                      <span className="text-xs text-gray-400">ID: {payment._id.slice(-8)}</span>
                    </div>
                  </td>
                  <td className="font-bold text-gray-800">${payment.price || payment.amout}</td>
                  <td className="text-gray-600">
                    {new Date(payment.date || payment.paidAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    <div className="badge badge-success badge-outline gap-2 px-4 py-3">
                      <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                      Success
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {payments.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg italic">No payment history found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
