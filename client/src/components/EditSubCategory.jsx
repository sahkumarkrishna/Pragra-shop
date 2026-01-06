import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import uploadImage from "../utils/UploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const EditSubCategory = ({ close, data, fetchData }) => {
  const allCategory = useSelector((state) => state.product.allCategory);

  const [subCategoryData, setSubCategoryData] = useState({
    _id: data._id,
    name: data.name,
    image: data.image,
    category: data.category || [],
  });

  /* ---------------- handlers ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData((p) => ({ ...p, [name]: value }));
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const res = await uploadImage(file);
      setSubCategoryData((p) => ({
        ...p,
        image: res.data.data.url,
      }));
    } catch (err) {
      AxiosToastError(err);
    }
  };

  const removeCategory = (id) => {
    setSubCategoryData((p) => ({
      ...p,
      category: p.category.filter((c) => c._id !== id),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios({
        ...SummaryApi.updateSubCategory,
        data: subCategoryData,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        fetchData?.();
        close?.();
      }
    } catch (err) {
      AxiosToastError(err);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <section className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg">

        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg">Edit Sub Category</h2>
          <button onClick={close} className="hover:text-red-500">
            <IoClose size={22} />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-5 grid gap-6 max-h-[85vh] overflow-y-auto"
        >

          {/* NAME */}
          <div>
            <label className="text-sm font-medium">Sub Category Name</label>
            <input
              name="name"
              value={subCategoryData.name}
              onChange={handleChange}
              placeholder="Enter sub category name"
              className="w-full mt-1 p-2 border rounded bg-slate-50"
              required
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="text-sm font-medium">Image</label>
            <div className="mt-2 flex flex-col sm:flex-row gap-4 items-center">
              <div className="w-32 h-32 border rounded bg-slate-50 flex items-center justify-center">
                {subCategoryData.image ? (
                  <img
                    src={subCategoryData.image}
                    alt="subcategory"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-sm text-slate-400">No Image</span>
                )}
              </div>

              <label className="cursor-pointer border px-4 py-2 rounded text-sm hover:bg-slate-100">
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleUploadImage}
                />
              </label>
            </div>
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-sm font-medium">Parent Category</label>

            {/* SELECTED */}
            <div className="flex flex-wrap gap-2 mt-2">
              {subCategoryData.category.map((cat) => (
                <span
                  key={cat._id}
                  className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-sm"
                >
                  {cat.name}
                  <IoClose
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => removeCategory(cat._id)}
                  />
                </span>
              ))}
            </div>

            {/* SELECT */}
            <select
              className="w-full mt-3 p-2 border rounded bg-slate-50"
              onChange={(e) => {
                const selected = allCategory.find(
                  (c) => c._id === e.target.value
                );
                if (!selected) return;

                setSubCategoryData((p) => {
                  if (p.category.some((c) => c._id === selected._id)) {
                    return p;
                  }
                  return {
                    ...p,
                    category: [...p.category, selected],
                  };
                });
              }}
            >
              <option value="">Select Category</option>
              {allCategory.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* SUBMIT */}
          <button
            disabled={
              !subCategoryData.name ||
              !subCategoryData.image ||
              subCategoryData.category.length === 0
            }
            className={`py-2 rounded font-semibold transition
              ${
                subCategoryData.name &&
                subCategoryData.image &&
                subCategoryData.category.length
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-300 cursor-not-allowed"
              }
            `}
          >
            Update Sub Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditSubCategory;
