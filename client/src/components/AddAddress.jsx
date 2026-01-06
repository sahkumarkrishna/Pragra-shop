import React from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useGlobalContext } from "../provider/GlobalProvider";

const AddAddress = ({ close }) => {
  const { register, handleSubmit, reset } = useForm();
  const { fetchAddress } = useGlobalContext();

  const onSubmit = async (data) => {
    try {
      const response = await Axios({
        ...SummaryApi.createAddress,
        data: {
          address_line: data.addressline,
          city: data.city,
          state: data.state,
          country: data.country,
          pincode: data.pincode,
          mobile: data.mobile,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        reset();
        close && close();
        fetchAddress && fetchAddress();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed inset-0 z-50 bg-black/70 flex items-start sm:items-center justify-center p-4 overflow-auto">

      {/* MODAL */}
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-5 animate-fadeIn">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <h2 className="text-lg font-semibold">Add New Address</h2>
            <p className="text-sm text-gray-500">
              Please fill in your delivery details
            </p>
          </div>

          <button
            onClick={close}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* FORM */}
        <form
          className="mt-4 grid gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="text-sm font-medium">Address Line</label>
            <input
              type="text"
              placeholder="House no, street name, area"
              className="w-full border bg-slate-50 p-2 rounded focus:outline-none focus:border-primary-200"
              {...register("addressline", { required: true })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">City</label>
              <input
                type="text"
                placeholder="Enter city"
                className="w-full border bg-slate-50 p-2 rounded focus:outline-none focus:border-primary-200"
                {...register("city", { required: true })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">State</label>
              <input
                type="text"
                placeholder="Enter state"
                className="w-full border bg-slate-50 p-2 rounded focus:outline-none focus:border-primary-200"
                {...register("state", { required: true })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Pincode</label>
              <input
                type="text"
                placeholder="6-digit pincode"
                className="w-full border bg-slate-50 p-2 rounded focus:outline-none focus:border-primary-200"
                {...register("pincode", { required: true })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Country</label>
              <input
                type="text"
                placeholder="Country name"
                className="w-full border bg-slate-50 p-2 rounded focus:outline-none focus:border-primary-200"
                {...register("country", { required: true })}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Mobile Number</label>
            <input
              type="text"
              placeholder="10-digit mobile number"
              className="w-full border bg-slate-50 p-2 rounded focus:outline-none focus:border-primary-200"
              {...register("mobile", { required: true })}
            />
          </div>

          {/* ACTION */}
          <button
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Save Address
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddAddress;
