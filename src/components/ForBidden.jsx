import React from "react";

//AdminRoute tar ekane ForBidden ta use kortechi private //user jodi admin na hoye admin private list gola te jaytese chait tokon page eta dekabo
const ForBidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-5">
      <h2 className="text-3xl font-bold text-red-600 mb-2">Access Denied</h2>
      <p className="text-gray-600 mb-6">You do not have permission to view this page.</p>
      <div className="flex gap-4">
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-2 bg-primary text-white rounded-md "
        >
          Back to Home
        </button>
        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="px-6 py-2 bg-primary text-white rounded-md"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ForBidden;
