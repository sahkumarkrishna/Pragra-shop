import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdDelete, MdEdit, MdLocationOn } from "react-icons/md";
import AddAddress from "../components/AddAddress";
import EditAddressDetails from "../components/EditAddressDetails";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useGlobalContext } from "../provider/GlobalProvider";

const Address = () => {
  const addressList = useSelector(
    (state) => state.addresses.addressList
  );
  const [openAddress, setOpenAddress] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const { fetchAddress } = useGlobalContext();

  const handleDisableAddress = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.disableAddress,
        data: { _id: id },
      });

      if (response.data.success) {
        toast.success("Address removed successfully");
        fetchAddress && fetchAddress();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="bg-slate-50 min-h-screen p-4">

      {/* HEADER */}
      <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Saved Addresses</h2>
          <p className="text-sm text-gray-500">
            Manage your delivery addresses
          </p>
        </div>

        <button
          onClick={() => setOpenAddress(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          + Add Address
        </button>
      </div>

      {/* ADDRESS LIST */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {addressList.filter(a => a.status).length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12">
            No address found. Click <b>Add Address</b> to create one.
          </div>
        )}

        {addressList.map(
          (address) =>
            address.status && (
              <div
                key={address._id}
                className="bg-white shadow rounded-xl p-4 flex justify-between gap-4 hover:shadow-lg transition"
              >
                {/* LEFT */}
                <div className="text-sm text-gray-700 space-y-1">
                  <div className="flex items-center gap-1 font-medium text-gray-800">
                    <MdLocationOn className="text-blue-600" />
                    Delivery Address
                  </div>
                  <p>{address.address_line}</p>
                  <p>
                    {address.city}, {address.state}
                  </p>
                  <p>
                    {address.country} – {address.pincode}
                  </p>
                  <p className="font-medium">
                    📞 {address.mobile}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col gap-3">
                  <button
                    title="Edit Address"
                    onClick={() => {
                      setOpenEdit(true);
                      setEditData(address);
                    }}
                    className="p-2 bg-green-100 rounded-full hover:bg-green-600 hover:text-white transition"
                  >
                    <MdEdit size={18} />
                  </button>

                  <button
                    title="Delete Address"
                    onClick={() =>
                      handleDisableAddress(address._id)
                    }
                    className="p-2 bg-red-100 rounded-full hover:bg-red-600 hover:text-white transition"
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
              </div>
            )
        )}

        {/* ADD NEW CARD */}
        <div
          onClick={() => setOpenAddress(true)}
          className="h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer bg-slate-100 hover:bg-slate-200 transition"
        >
          <span className="text-3xl text-blue-600">+</span>
          <p className="text-sm text-gray-600 mt-1">
            Add New Address
          </p>
        </div>
      </div>

      {/* MODALS */}
      {openAddress && (
        <AddAddress close={() => setOpenAddress(false)} />
      )}

      {openEdit && (
        <EditAddressDetails
          data={editData}
          close={() => setOpenEdit(false)}
        />
      )}
    </section>
  );
};

export default Address;
