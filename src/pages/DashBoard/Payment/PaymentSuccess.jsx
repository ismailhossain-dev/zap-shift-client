import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  //useSearchPrams eta react router hook eta diye amra amder project er url ta access kori
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
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
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`).then((res) => {
        console.log(res);
      });
    }
    //dependency hobe amra useEffect ja kichu niye kaj korsi segola dependency vitore dithe hobe
  }, [sessionId, axiosSecure]);
  return (
    <div>
      {/* h2.text-4xl${Payment Successful} */}
      <h2 className="text-4xl1">Payment Successful</h2>
    </div>
  );
};

export default PaymentSuccess;
