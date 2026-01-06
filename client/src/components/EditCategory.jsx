import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

import uploadImage from "../utils/UploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const EditCategory = ({ close, fetchData, data: CategoryData }) => {
  const [data, setData] = useState({
    _id: CategoryData._id,
    name: CategoryData.name,
    image: CategoryData.image,
  });

  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const response = await uploadImage(file);
      setData((prev) => ({
        ...prev,
        image: response.data.data.url,
      }));
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateCategory,
        data,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchData();
        close();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg animate-fadeIn">

        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Edit Category</h2>
          <button onClick={close} className="hover:text-red-500">
            <IoClose size={24} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-4 grid gap-5">

          {/* CATEGORY NAME */}
          <div>
            <label className="text-sm font-medium">Category Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleOnChange}
              placeholder="Enter category name"
              className="w-full mt-1 p-2 rounded border bg-slate-50 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* CATEGORY IMAGE */}
          <div>
            <label className="text-sm font-medium">Category Image</label>

            <div className="flex flex-col sm:flex-row gap-4 mt-2 items-center">
              <div className="h-32 w-32 border rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="Category"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <p className="text-xs text-gray-400">No Image</p>
                )}
              </div>

              <label className="cursor-pointer">
                <div
                  className={`px-4 py-2 rounded border font-medium text-sm
                  ${
                    !data.name
                      ? "bg-gray-300 cursor-not-allowed"
                      : "border-blue-600 text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {loading ? "Uploading..." : "Change Image"}
                </div>
                <input
                  type="file"
                  hidden
                  disabled={!data.name}
                  accept="image/*"
                  onChange={handleUploadCategoryImage}
                />
              </label>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={close}
              className="w-1/2 border py-2 rounded hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!data.name || !data.image || loading}
              className={`w-1/2 py-2 rounded font-semibold text-white
                ${
                  data.name && data.image
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              Update Category
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditCategory;
