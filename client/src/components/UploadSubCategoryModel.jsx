import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const UploadSubCategoryModel = ({ close, fetchData }) => {
  const allCategory = useSelector((state) => state.product.allCategory);

  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    image: "",
    category: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const response = await uploadImage(file);
      setSubCategoryData((prev) => ({
        ...prev,
        image: response.data.data.url,
      }));
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleRemoveCategorySelected = (categoryId) => {
    setSubCategoryData((prev) => ({
      ...prev,
      category: prev.category.filter((c) => c._id !== categoryId),
    }));
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.createSubCategory,
        data: subCategoryData,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchData?.();
        close?.();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const isValid =
    subCategoryData.name &&
    subCategoryData.image &&
    subCategoryData.category.length > 0;

  return (
    <section className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">Add Sub Category</h2>
            <p className="text-sm text-gray-500">
              Create and assign a sub category
            </p>
          </div>
          <button onClick={close} className="hover:text-red-500">
            <IoClose size={22} />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmitSubCategory}
          className="p-5 grid gap-5"
        >
          {/* NAME */}
          <div className="grid gap-1">
            <label className="text-sm font-medium">Sub Category Name</label>
            <input
              name="name"
              value={subCategoryData.name}
              onChange={handleChange}
              placeholder="e.g. Mobile Accessories"
              required
              className="p-2 border rounded-md bg-slate-50 focus:outline-none focus:border-primary-200"
            />
          </div>

          {/* IMAGE */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Sub Category Image</label>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="w-full sm:w-32 h-32 bg-slate-50 border rounded-lg flex items-center justify-center overflow-hidden">
                {subCategoryData.image ? (
                  <img
                    src={subCategoryData.image}
                    alt="sub-category"
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
                  accept="image/*"
                  onChange={handleUploadSubCategoryImage}
                />
                <div className="px-4 py-2 border border-primary-200 text-primary-200 rounded-md cursor-pointer hover:bg-primary-100 text-sm font-medium">
                  Upload Image
                </div>
              </label>
            </div>
          </div>

          {/* CATEGORY SELECT */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Parent Category</label>

            {/* Selected Categories */}
            <div className="flex flex-wrap gap-2">
              {subCategoryData.category.map((cat) => (
                <span
                  key={cat._id}
                  className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-sm"
                >
                  {cat.name}
                  <IoClose
                    size={16}
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveCategorySelected(cat._id)}
                  />
                </span>
              ))}
            </div>

            {/* Dropdown */}
            <select
              className="p-2 border rounded-md bg-slate-50"
              onChange={(e) => {
                const selected = allCategory.find(
                  (c) => c._id === e.target.value
                );
                if (!selected) return;

                setSubCategoryData((prev) => ({
                  ...prev,
                  category: [...prev.category, selected],
                }));
              }}
            >
              <option value="">Select Category</option>
              {allCategory.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* SUBMIT */}
          <button
            disabled={!isValid}
            className={`w-full py-2 rounded-md font-semibold transition
              ${
                isValid
                  ? "bg-primary-200 hover:bg-primary-100"
                  : "bg-gray-300 cursor-not-allowed"
              }
            `}
          >
            Add Sub Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategoryModel;
