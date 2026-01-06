import React, { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import EditCategory from "../components/EditCategory";
import CofirmBox from "../components/CofirmBox";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({ name: "", image: "" });
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({ _id: "" });

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({ ...SummaryApi.getCategory });
      if (response.data.success) {
        setCategoryData(response.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchCategory();
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="bg-slate-50 min-h-screen p-4">

      {/* HEADER */}
      <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Manage Categories</h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          + Add Category
        </button>
      </div>

      {/* NO DATA */}
      {!categoryData.length && !loading && <NoData />}

      {/* CATEGORY GRID */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categoryData.map((category) => (
          <div
            key={category._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col"
          >
            {/* IMAGE */}
            <div className="h-32 flex items-center justify-center p-2">
              <img
                src={category.image}
                alt={category.name}
                className="h-full object-contain"
              />
            </div>

            {/* NAME */}
            <p className="text-center font-medium text-sm px-2 mb-2">
              {category.name}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-2 px-2 pb-3">
              <button
                onClick={() => {
                  setOpenEdit(true);
                  setEditData(category);
                }}
                className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 text-xs py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setOpenConfirmBoxDelete(true);
                  setDeleteCategory(category);
                }}
                className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 text-xs py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* LOADING */}
      {loading && <Loading />}

      {/* MODALS */}
      {openUploadCategory && (
        <UploadCategoryModel
          fetchData={fetchCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}

      {openEdit && (
        <EditCategory
          data={editData}
          fetchData={fetchCategory}
          close={() => setOpenEdit(false)}
        />
      )}

      {openConfirmBoxDelete && (
        <CofirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          cancel={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default CategoryPage;
