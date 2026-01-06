import React, { useState } from "react";
import EditProductAdmin from "./EditProductAdmin";
import CofirmBox from "./CofirmBox";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";

const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data: { _id: data._id },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchProductData?.();
        setOpenDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <>
      {/* CARD */}
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-3 flex flex-col gap-3">

        {/* IMAGE */}
        <div className="w-full aspect-square bg-slate-50 rounded-lg overflow-hidden">
          <img
            src={data?.image?.[0]}
            alt={data?.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* NAME */}
        <p className="text-sm font-semibold line-clamp-2 text-gray-800">
          {data?.name}
        </p>

        {/* META */}
        {data?.unit && (
          <p className="text-xs text-gray-500">{data.unit}</p>
        )}

        {/* ACTIONS */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={() => setEditOpen(true)}
            className="text-xs font-medium border border-green-600 bg-green-50 text-green-700 rounded-md py-1 hover:bg-green-100"
          >
            Edit
          </button>

          <button
            onClick={() => setOpenDelete(true)}
            className="text-xs font-medium border border-red-600 bg-red-50 text-red-600 rounded-md py-1 hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editOpen && (
        <EditProductAdmin
          data={data}
          fetchProductData={fetchProductData}
          close={() => setEditOpen(false)}
        />
      )}

      {/* DELETE CONFIRM */}
      {openDelete && (
        <CofirmBox
          close={() => setOpenDelete(false)}
          cancel={() => setOpenDelete(false)}
          confirm={handleDelete}
        />
      )}
    </>
  );
};

export default ProductCardAdmin;
