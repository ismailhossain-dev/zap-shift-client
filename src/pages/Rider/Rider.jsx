import React from "react";
import riderImg from "../../assets/agent-pending.png";
import { useForm, useWatch } from "react-hook-form";
// import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Rider = () => {
  const { register, handleSubmit, control } = useForm();
  // const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData() || [];
  const regions = [...new Set(serviceCenters.map((c) => c.region))];
  const riderRegion = useWatch({ control, name: "riderRegion" });

  const districtsByRegion = (region) => {
    if (!region) return [];
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    return [...new Set(regionDistricts.map((d) => d.district))];
  };

  const handleSendParcel = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          title: "Your Application has bee submitted. We will reach to you in 145 days ",
          draggable: true,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-2">Be a Rider</h1>
          <p className="text-gray-500">Join our community and start earning today!</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
          {/* Form Container */}
          <div className="w-full lg:w-3/5 bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">
            <form onSubmit={handleSubmit(handleSendParcel)} className="space-y-6">
              {/* Grid for Two Column Layout on Desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="form-control">
                  <label className="label font-semibold text-gray-700">Your Name</label>
                  <input
                    type="text"
                    {...register("riderName")}
                    className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400"
                    placeholder="Full Name"
                  />
                </div>

                {/* Email */}
                <div className="form-control">
                  <label className="label font-semibold text-gray-700">Your Email</label>
                  <input
                    type="email"
                    {...register("riderEmail")}
                    className="input input-bordered w-full"
                    placeholder="email@example.com"
                  />
                </div>

                {/* License Number */}
                <div className="form-control">
                  <label className="label font-semibold text-gray-700">
                    Driving License Number
                  </label>
                  <input
                    type="text"
                    {...register("licenseNumber")}
                    className="input input-bordered w-full"
                    placeholder="DL-XXXXXXX"
                  />
                </div>

                {/* NID */}
                <div className="form-control">
                  <label className="label font-semibold text-gray-700">NID Number</label>
                  <input
                    type="number"
                    {...register("riderNID")}
                    className="input input-bordered w-full"
                    placeholder="National ID"
                  />
                </div>

                {/* Region */}
                <div className="form-control">
                  <label className="label font-semibold text-gray-700">Rider Region</label>
                  <select
                    {...register("riderRegion")}
                    defaultValue=""
                    className="select select-bordered w-full"
                  >
                    <option value="" disabled>
                      Pick a region
                    </option>
                    {regions.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District */}
                <div className="form-control">
                  <label className="label font-semibold text-gray-700">Rider District</label>
                  <select
                    {...register("riderDistrict")}
                    defaultValue=""
                    className="select select-bordered w-full"
                  >
                    <option value="" disabled>
                      Pick a district
                    </option>
                    {districtsByRegion(riderRegion).map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Phone Number */}
                <div className="form-control">
                  <label className="label font-semibold text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    {...register("riderPhoneNumber")}
                    className="input input-bordered w-full"
                    placeholder="017XXXXXXXX"
                  />
                </div>

                {/* Bike Registration */}
                <div className="form-control">
                  <label className="label font-semibold text-gray-700">Bike Registration No.</label>
                  <input
                    type="text"
                    {...register("riderBikeRegistrationNumber")}
                    className="input input-bordered w-full"
                    placeholder="Reg. No"
                  />
                </div>
              </div>

              {/* Full Width Inputs */}
              <div className="form-control mt-4">
                <label className="label font-semibold text-gray-700">
                  Bike Brand, Model & Year
                </label>
                <input
                  type="text"
                  {...register("riderBikeModeYear")}
                  className="input input-bordered w-full"
                  placeholder="e.g. Yamaha FZ-S V3 2023"
                />
              </div>

              <div className="form-control mt-4">
                <label className="label font-semibold text-gray-700">Tell Us About Yourself</label>
                <textarea
                  {...register("riderTellAboutYourself")}
                  className="textarea textarea-bordered h-24 w-full"
                  placeholder="Briefly describe your experience..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full md:w-auto px-12 bg-indigo-600 border-none hover:bg-indigo-700 text-white font-bold transition-all duration-300"
              >
                Submit Application
              </button>
            </form>
          </div>

          {/* Image Container - Desktop e right e thakbe, mobile e niche chole jabe */}
          <div className="w-full lg:w-2/5 flex flex-col items-center">
            <div className="sticky top-10">
              <img
                src={riderImg}
                alt="Rider Illustration"
                className="w-full max-w-sm md:max-w-md lg:max-w-full drop-shadow-2xl animate-pulse-slow"
              />
              <div className="mt-8 p-6 bg-indigo-50 rounded-xl border-l-4 border-indigo-500 hidden lg:block">
                <p className="italic text-indigo-900 text-sm">
                  "Being a rider means more than just delivery; it's about freedom and earning with
                  respect."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rider;
