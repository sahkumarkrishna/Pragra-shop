import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const UploadCategoryModel = ({ close, fetchData }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
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
        ...SummaryApi.addCategory,
        data,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchData?.();
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
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div>
            <h2 className="font-semibold text-lg">Add Category</h2>
            <p className="text-sm text-gray-500">Create a new product category</p>
          </div>
          <button onClick={close} className="hover:text-red-500">
            <IoClose size={22} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-5 grid gap-5">

          {/* CATEGORY NAME */}
          <div className="grid gap-1">
            <label className="text-sm font-medium">Category Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleOnChange}
              placeholder="e.g. Electronics"
              required
              className="bg-slate-50 border p-2 rounded-md focus:outline-none focus:border-primary-200"
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Category Image</label>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:w-32 h-32 bg-slate-50 border rounded-lg flex items-center justify-center overflow-hidden">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="category"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-gray-400">No Image</span>
                )}
              </div>

              <label>
                <input
                  type="file"
                  hidden
                  disabled={!data.name}
                  accept="image/*"
                  onChange={handleUploadCategoryImage}
                />
                <div
                  className={`px-4 py-2 text-sm rounded-md border cursor-pointer font-medium
                    ${
                      data.name
                        ? "border-primary-200 text-primary-200 hover:bg-primary-100"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }
                  `}
                >
                  {loading ? "Uploading..." : "Upload Image"}
                </div>
              </label>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            disabled={!data.name || !data.image || loading}
            className={`w-full py-2 rounded-md font-semibold transition
              ${
                data.name && data.image
                  ? "bg-primary-200 hover:bg-primary-100"
                  : "bg-gray-300 cursor-not-allowed"
              }
            `}
          >
            Add Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;
