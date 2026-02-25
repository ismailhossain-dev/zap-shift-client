import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { CheckCircle2, Copy, ArrowRight, Package } from "lucide-react";
import { toast } from "react-toastify";
// import { CheckCircle2, Copy, ArrowRight, Package } from "lucide-react";
const PaymentSuccess = () => {
  //access website url in userSearchParams
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  //state vitore amra set korsi transactionId and tracking id set korar jorno
  const [paymentInfo, setPaymentInfo] = useState({});
  //session_id ta astese url te ? mark er pore session_id ta ase and pora link ta astese success-url amra ekta dynamic link disilam tai

  //basically amra session_id ta antesi user ke track korar jorno
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);

  //Side Effect
  //amra ekane payment-success patch take access kortesi
  useEffect(() => {
    //jodi stripe er tracking id ta take
    if (sessionId) {
      // payment-success backend ta pataitesi
      //?session_id= ta title url teke
      //egola korar pore amader ke ekta backend session id dive
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)

        .then((res) => {
          //res er madome backend data gola dekabe jemon transectionId trackingId
          // console.log("hello pera", res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  //traction id copy text
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to tractionId");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
        </div>

        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
        <p className="text-gray-500 mb-8">
          Hooray! Your payment has been processed successfully. We've sent a confirmation email.
        </p>

        {/* Info Card */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left space-y-4">
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <span className="text-sm text-gray-500 font-medium uppercase tracking-wider">
              Transaction ID
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono font-semibold text-gray-700">
                {paymentInfo.transactionId}
              </span>
              <button
                onClick={() => copyToClipboard(paymentInfo.trackingId)}
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 font-medium uppercase tracking-wider">
              Tracking ID
            </span>
            <div className="flex items-center gap-2">
              <Package size={16} className="text-blue-500" />
              <span className="text-sm font-semibold text-gray-700">{paymentInfo.trackingId}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2">
            Track Your Parcel <ArrowRight size={18} />
          </button>

          <button className="w-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium py-3 rounded-lg transition-all">
            Download Receipt
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-400">
          Need help?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
