import React, { useEffect, useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import DisplayTable from "../components/DisplayTable";
import { createColumnHelper } from "@tanstack/react-table";
import ViewImage from "../components/ViewImage";
import { MdDelete } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import EditSubCategory from "../components/EditSubCategory";
import CofirmBox from "../components/CofirmBox";
import toast from "react-hot-toast";

const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columnHelper = createColumnHelper();
  const [imageURL, setImageURL] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({ _id: "" });
  const [deleteSubCategory, setDeleteSubCategory] = useState({ _id: "" });
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false);

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({ ...SummaryApi.getSubCategory });
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  const column = [
    columnHelper.accessor("name", {
      header: "Sub Category",
    }),

    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <img
            src={row.original.image}
            alt={row.original.name}
            className="w-10 h-10 object-contain cursor-pointer rounded hover:scale-105 transition"
            onClick={() => setImageURL(row.original.image)}
          />
        </div>
      ),
    }),

    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.category.map((c) => (
            <span
              key={c._id}
              className="text-xs bg-slate-100 px-2 py-0.5 rounded"
            >
              {c.name}
            </span>
          ))}
        </div>
      ),
    }),

    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => {
              setOpenEdit(true);
              setEditData(row.original);
            }}
            className="p-2 bg-green-100 rounded-full hover:bg-green-600 hover:text-white transition"
          >
            <HiPencil size={18} />
          </button>

          <button
            onClick={() => {
              setOpenDeleteConfirmBox(true);
              setDeleteSubCategory(row.original);
            }}
            className="p-2 bg-red-100 rounded-full hover:bg-red-600 hover:text-white transition"
          >
            <MdDelete size={18} />
          </button>
        </div>
      ),
    }),
  ];

  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteSubCategory,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchSubCategory();
        setOpenDeleteConfirmBox(false);
        setDeleteSubCategory({ _id: "" });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="bg-slate-50 min-h-screen p-3 sm:p-4">

      {/* HEADER */}
      <div className="bg-white shadow rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:items-center">
        <div>
          <h2 className="text-lg font-semibold">Sub Categories</h2>
          <p className="text-sm text-gray-500">
            Manage all product sub categories
          </p>
        </div>

        <button
          onClick={() => setOpenAddSubCategory(true)}
          className="sm:ml-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          + Add Sub Category
        </button>
      </div>

      {/* TABLE */}
      <div className="mt-4 bg-white shadow rounded-lg overflow-auto max-w-full">
        {data.length === 0 && !loading ? (
          <div className="text-center py-10 text-gray-500 text-sm">
            No sub categories found. Click <b>Add Sub Category</b> to create one.
          </div>
        ) : (
          <DisplayTable data={data} column={column} loading={loading} />
        )}
      </div>

      {/* MODALS */}
      {openAddSubCategory && (
        <UploadSubCategoryModel
          close={() => setOpenAddSubCategory(false)}
          fetchData={fetchSubCategory}
        />
      )}

      {imageURL && (
        <ViewImage url={imageURL} close={() => setImageURL("")} />
      )}

      {openEdit && (
        <EditSubCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchSubCategory}
        />
      )}

      {openDeleteConfirmBox && (
        <CofirmBox
          cancel={() => setOpenDeleteConfirmBox(false)}
          close={() => setOpenDeleteConfirmBox(false)}
          confirm={handleDeleteSubCategory}
        />
      )}
    </section>
  );
};

export default SubCategoryPage;
