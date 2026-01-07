import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

import uploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import AddFieldComponent from "../components/AddFieldComponent";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import successAlert from "../utils/SuccessAlert";

const UploadProduct = () => {
  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });

  const [imageLoading, setImageLoading] = useState(false);
  const [viewImageURL, setViewImageURL] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageLoading(true);
    const response = await uploadImage(file);
    const imageUrl = response.data.data.url;

    setData((prev) => ({
      ...prev,
      image: [...prev.image, imageUrl],
    }));
    setImageLoading(false);
  };

  const handleDeleteImage = (index) => {
    setData((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
  };

  const handleAddField = () => {
    if (!fieldName) return;
    setData((prev) => ({
      ...prev,
      more_details: { ...prev.more_details, [fieldName]: "" },
    }));
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data,
      });

      if (response.data.success) {
        successAlert(response.data.message);
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
        setSelectCategory("");
        setSelectSubCategory("");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="bg-slate-50 min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 grid gap-6 max-w-4xl mx-auto"
      >
        {/* PRODUCT NAME */}
        <div>
          <label className="font-medium">Product Name</label>
          <input
            name="name"
            value={data.name}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 rounded border bg-slate-50"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="font-medium">Product Description</label>
          <textarea
            name="description"
            rows={3}
            value={data.description}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 rounded border bg-slate-50 resize-none"
          />
        </div>

        {/* CATEGORY & SUBCATEGORY */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* CATEGORY */}
          <div>
            <label className="font-medium">Category</label>
            <select
              className="w-full mt-1 p-2 border rounded bg-slate-50"
              value={selectCategory}
              onChange={(e) => {
                const value = e.target.value;
                const cat = allCategory.find((c) => c._id === value);
                if (!cat) return;

                setSelectCategory(value);
                setSelectSubCategory("");

                setData((prev) => ({
                  ...prev,
                  category: [cat],
                  subCategory: [],
                }));
              }}
            >
              <option value="">Select main category</option>
              {allCategory.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* SUB CATEGORY */}
          <div>
            <label className="font-medium">Sub Category</label>
            <select
              className="w-full mt-1 p-2 border rounded bg-slate-50"
              value={selectSubCategory}
              disabled={!selectCategory}
              onChange={(e) => {
                const value = e.target.value;
                const sc = allSubCategory.find((s) => s._id === value);
                if (!sc) return;

                setSelectSubCategory(value);

                setData((prev) => ({
                  ...prev,
                  subCategory: [sc],
                }));
              }}
            >
              <option value="">
                {selectCategory
                  ? "Select sub category"
                  : "Select category first"}
              </option>

              {allSubCategory
                .filter((sub) =>
                  sub.category.some((c) => c._id === selectCategory)
                )
                .map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold">
          Submit Product
        </button>
      </form>

      {viewImageURL && (
        <ViewImage url={viewImageURL} close={() => setViewImageURL("")} />
      )}

      {openAddField && (
        <AddFieldComponent
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          submit={handleAddField}
          close={() => setOpenAddField(false)}
        />
      )}
    </section>
  );
};

export default UploadProduct;
