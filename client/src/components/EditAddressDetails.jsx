import React from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { useGlobalContext } from "../provider/GlobalProvider";

const EditAddressDetails = ({ close, data }) => {
  const { fetchAddress } = useGlobalContext();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      _id: data._id,
      userId: data.userId,
      address_line: data.address_line,
      city: data.city,
      state: data.state,
      country: data.country,
      pincode: data.pincode,
      mobile: data.mobile,
    },
  });

  const onSubmit = async (formData) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateAddress,
        data: formData,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchAddress();
        reset();
        close();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg animate-fadeIn">

        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Edit Address</h2>
          <button onClick={close} className="hover:text-red-500">
            <IoClose size={24} />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 grid gap-4"
        >
          {/* Address Line */}
          <div>
            <label className="text-sm font-medium">Address Line</label>
            <input
              {...register("address_line", { required: true })}
              className="w-full mt-1 p-2 border rounded bg-slate-50 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="House no, Street, Area"
            />
          </div>

          {/* City & State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">City</label>
              <input
                {...register("city", { required: true })}
                className="w-full mt-1 p-2 border rounded bg-slate-50"
                placeholder="City"
              />
            </div>

            <div>
              <label className="text-sm font-medium">State</label>
              <input
                {...register("state", { required: true })}
                className="w-full mt-1 p-2 border rounded bg-slate-50"
                placeholder="State"
              />
            </div>
          </div>

          {/* Country & Pincode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Country</label>
              <input
                {...register("country", { required: true })}
                className="w-full mt-1 p-2 border rounded bg-slate-50"
                placeholder="Country"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Pincode</label>
              <input
                {...register("pincode", { required: true })}
                className="w-full mt-1 p-2 border rounded bg-slate-50"
                placeholder="Postal Code"
              />
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label className="text-sm font-medium">Mobile Number</label>
            <input
              {...register("mobile", { required: true })}
              className="w-full mt-1 p-2 border rounded bg-slate-50"
              placeholder="10-digit mobile number"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={close}
              className="w-1/2 border border-gray-300 py-2 rounded hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditAddressDetails;
