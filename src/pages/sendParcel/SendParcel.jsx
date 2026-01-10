import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";

const SendParcel = () => {
  const { register, handleSubmit, watch } = useForm();
  //react hook check
  const handleSendParcel = (data) => {
    console.log(data);
  };
  const ServiceCenters = useLoaderData();
  //amra ekane just map kore regions gola nivo je
  const regionsDuplicate = ServiceCenters.map((c) => c.region);
  // console.log(regionsDuplicate);

  //eta korle just name ekbar  takbe je
  // const regions = new Set(regionsDuplicate);
  //duplicate region na asar jorno eta korsi
  const regions = [...new Set(regionsDuplicate)];
  // console.log(regions);
  // react hook from watch eta korle jeta hobe region select korle district chole asbe
  const senderRegion = watch("senderRegion");

  // input e region select kolre district dekabe
  const districtsByRegion = (region) => {
    const regionDistricts = ServiceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  return (
    <div>
      <h2 className="text-5xl font-bold">Send A Parcel</h2>

      <form onSubmit={handleSubmit(handleSendParcel)} className="mt-12 p-4 text-black">
        {/* parcel type */}
        <div className="flex gap-6 my-4">
          <label className="label cursor-pointer gap-2">
            <input
              type="radio"
              name="docType"
              value="document"
              className="radio"
              defaultChecked
              {...register("parcelType")}
            />
            <span className="label-text">Document</span>
          </label>

          <label className="label cursor-pointer gap-2">
            {/* console non-document value name will found  */}
            <input
              type="radio"
              name="docType"
              value="non-document"
              className="radio"
              {...register("parcelType")}
            />
            <span className="label-text">Non-Document</span>
          </label>
        </div>
        {/* parcel info: name weight */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 my-8">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight (kg)</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>

        {/**two column */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* sender info */}
          <div className="">
            {/* Sender Name */}
            <fieldset className="fieldset">
              <h1 className="text-2xl font-semibold">Sender Details</h1>
              <label className="label mt-4">Sender Name</label>
              <input
                type="text"
                {...register("senderName")}
                className="input w-full"
                placeholder="sender Name"
              />
            </fieldset>
            {/* Sender email */}
            <fieldset className="fieldset">
              <label className="label mt-4">Sender Email</label>
              <input
                type="text"
                {...register("senderEmail")}
                className="input w-full"
                placeholder="sender Email"
              />
            </fieldset>
            {/* sender region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Regions</legend>
              <select {...register("senderRegion")} defaultValue="Pick a region" className="select">
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* sender districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Districts</legend>
              <select
                {...register("senderDistrict")}
                defaultValue="Pick a district"
                className="select"
              >
                <option disabled={true}>Pick a district</option>
                {districtsByRegion(senderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Sender Address */}
            <fieldset className="fieldset">
              <label className="label mt-4">Sender Address</label>
              <input
                type="text"
                {...register("senderAddress")}
                className="input w-full"
                placeholder="Sender Address"
              />
            </fieldset>
            {/* Sender Phone No */}
            <fieldset className="fieldset">
              <label className="label mt-4">Sender Phone No</label>
              <input
                type="number"
                {...register("senderPhone")}
                className="input w-full"
                placeholder="Sender Phone No"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Pickup Instruction</legend>
              <textarea
                className="textarea h-24 w-full"
                {...register("senderTextarea")}
                placeholder="Pickup Instruction"
              ></textarea>
            </fieldset>
          </div>
          {/* Sender  */}
          {/*receiver info  */}
          <div className="">
            {/* Sender Name */}
            <fieldset className="fieldset">
              <h1 className="text-2xl font-semibold">Receiver Details</h1>
              <label className="label mt-4">Receiver Name</label>
              <input
                type="text"
                {...register("receiverName")}
                className="input w-full"
                placeholder="Receiver Name"
              />
            </fieldset>
            {/* Receiver Email */}
            <fieldset className="fieldset">
              <label className="label mt-4">Receiver Email</label>
              <input
                type="text"
                {...register("receiverEmail")}
                className="input w-full"
                placeholder="Receiver Email"
              />
            </fieldset>

            {/* Receiver Address */}
            <fieldset className="fieldset">
              <label className="label mt-4">Receiver Address</label>
              <input
                type="text"
                {...register("receiverAddress")}
                className="input w-full"
                placeholder="Receiver Address"
              />
            </fieldset>
            {/* Receiver Phone No */}
            <fieldset className="fieldset">
              <label className="label mt-4">Receiver Phone No</label>
              <input
                type="number"
                {...register("receiverPhone")}
                className="input w-full"
                placeholder="Receiver Phone No"
              />
            </fieldset>

            {/* Receiver Textarea */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Pickup Instruction</legend>
              <textarea
                className="textarea h-24 w-full"
                {...register("receiverTextarea")}
                placeholder="Pickup Instruction"
              ></textarea>
            </fieldset>
          </div>
        </div>
        <input
          className="btn btn-primary text-black font-bold w-md mt-4"
          type="submit"
          value="Send Parcel"
        />
      </form>
    </div>
  );
};

export default SendParcel;
