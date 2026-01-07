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
    description: "",
    image: [],
    category: [],
    subCategory: [],
    stock: "",
    price: "",
    discount: "",
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
    try {
      const res = await uploadImage(file);
      setData((prev) => ({
        ...prev,
        image: [...prev.image, res.data.data.url],
      }));
    } finally {
      setImageLoading(false);
    }
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
      const res = await Axios({
        ...SummaryApi.createProduct,
        data,
      });
      if (res.data.success) {
        successAlert(res.data.message);
        setData({
          name: "",
          description: "",
          image: [],
          category: [],
          subCategory: [],
          stock: "",
          price: "",
          discount: "",
          more_details: {},
        });
        setSelectCategory("");
        setSelectSubCategory("");
      }
    } catch (err) {
      AxiosToastError(err);
    }
  };

  return (
    <section className="bg-slate-50 min-h-screen p-4">
      {/* HEADER */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <h2 className="text-lg font-semibold">Add New Product</h2>
        <p className="text-sm text-gray-500">
          Fill in the details below to add a product to your store
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto space-y-6"
      >
        {/* PRODUCT NAME */}
        <div>
          <label className="text-sm font-medium">Product Name</label>
          <input
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Enter product name (e.g. Wireless Headphones)"
            className="w-full mt-1 p-2 border rounded bg-slate-50"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm font-medium">Product Description</label>
          <textarea
            name="description"
            rows={4}
            value={data.description}
            onChange={handleChange}
            placeholder="Describe the product features, usage, and benefits"
            className="w-full mt-1 p-2 border rounded bg-slate-50 resize-none"
            required
          />
        </div>

        {/* IMAGES */}
        <div>
          <label className="text-sm font-medium">Product Images</label>
          <label className="mt-2 h-32 border-2 border-dashed rounded flex flex-col items-center justify-center cursor-pointer bg-slate-50">
            {imageLoading ? (
              <Loading />
            ) : (
              <>
                <FaCloudUploadAlt size={26} />
                <p className="text-sm mt-1">Click to upload product images</p>
                <p className="text-xs text-gray-500">JPG, PNG (recommended)</p>
              </>
            )}
            <input type="file" hidden accept="image/*" onChange={handleUploadImage} />
          </label>

          <div className="flex gap-3 mt-3 flex-wrap">
            {data.image.map((img, i) => (
              <div key={img} className="w-20 h-20 border rounded relative">
                <img
                  src={img}
                  alt="product"
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={() => setViewImageURL(img)}
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(i)}
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded"
                >
                  <MdDelete size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORY */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Category</label>
            <select
              value={selectCategory}
              onChange={(e) => {
                const val = e.target.value;
                const cat = allCategory.find((c) => c._id === val);
                if (!cat) return;
                setSelectCategory(val);
                setSelectSubCategory("");
                setData((prev) => ({
                  ...prev,
                  category: [cat],
                  subCategory: [],
                }));
              }}
              className="w-full mt-1 p-2 border rounded bg-slate-50"
            >
              <option value="">Select main category</option>
              {allCategory.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Sub Category</label>
            <select
              value={selectSubCategory}
              disabled={!selectCategory}
              onChange={(e) => {
                const val = e.target.value;
                const sub = allSubCategory.find((s) => s._id === val);
                if (!sub) return;
                setSelectSubCategory(val);
                setData((prev) => ({
                  ...prev,
                  subCategory: [sub],
                }));
              }}
              className="w-full mt-1 p-2 border rounded bg-slate-50"
            >
              <option value="">
                {selectCategory ? "Select sub category" : "Select category first"}
              </option>
              {allSubCategory
                .filter((s) =>
                  s.category.some((c) => c._id === selectCategory)
                )
                .map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* PRICE & STOCK */}
        <div className="grid md:grid-cols-3 gap-4">
          <input
            name="stock"
            value={data.stock}
            onChange={handleChange}
            placeholder="Available stock (e.g. 50)"
            className="p-2 border rounded bg-slate-50"
          />
          <input
            name="price"
            value={data.price}
            onChange={handleChange}
            placeholder="Selling price (₹)"
            className="p-2 border rounded bg-slate-50"
          />
          <input
            name="discount"
            value={data.discount}
            onChange={handleChange}
            placeholder="Discount percentage (e.g. 10)"
            className="p-2 border rounded bg-slate-50"
          />
        </div>

        <button
          type="button"
          onClick={() => setOpenAddField(true)}
          className="border px-4 py-1 rounded text-sm"
        >
          + Add Custom Field
        </button>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold">
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
