import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";

import uploadImage from "../utils/UploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import successAlert from "../utils/SuccessAlert";

import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import AddFieldComponent from "../components/AddFieldComponent";

const EditProductAdmin = ({ close, data: propsData, fetchProductData }) => {
  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  const [data, setData] = useState({
    _id: propsData._id,
    name: propsData.name,
    image: propsData.image || [],
    category: propsData.category || [],
    subCategory: propsData.subCategory || [],
    stock: propsData.stock,
    price: propsData.price,
    discount: propsData.discount,
    description: propsData.description,
    more_details: propsData.more_details || {},
  });

  const [loadingImage, setLoadingImage] = useState(false);
  const [viewImageURL, setViewImageURL] = useState("");
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  /* ---------------- handlers ---------------- */

  const handleChange = (e) =>
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoadingImage(true);
      const res = await uploadImage(file);
      setData((p) => ({ ...p, image: [...p.image, res.data.data.url] }));
    } catch (err) {
      AxiosToastError(err);
    } finally {
      setLoadingImage(false);
    }
  };

  const removeItem = (key, index) =>
    setData((p) => ({
      ...p,
      [key]: p[key].filter((_, i) => i !== index),
    }));

  const handleAddField = () => {
    if (!fieldName) return;
    setData((p) => ({
      ...p,
      more_details: { ...p.more_details, [fieldName]: "" },
    }));
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios({
        ...SummaryApi.updateProductDetails,
        data,
      });

      if (res.data.success) {
        successAlert(res.data.message);
        fetchProductData();
        close();
      }
    } catch (err) {
      AxiosToastError(err);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <section className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Edit Product</h2>
          <button onClick={close} className="hover:text-red-500">
            <IoClose size={22} />
          </button>
        </div>

        {/* BODY */}
        <form
          onSubmit={handleSubmit}
          className="p-5 max-h-[85vh] overflow-y-auto grid gap-6"
        >

          {/* BASIC INFO */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="font-medium text-sm">Product Name</label>
              <input
                name="name"
                value={data.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded bg-slate-50"
                required
              />
            </div>

            <div>
              <label className="font-medium text-sm">Stock</label>
              <input
                type="number"
                name="stock"
                value={data.stock}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded bg-slate-50"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-medium text-sm">Description</label>
            <textarea
              name="description"
              rows={3}
              value={data.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded bg-slate-50 resize-none"
              required
            />
          </div>

          {/* IMAGES */}
          <div>
            <label className="font-medium text-sm">Product Images</label>

            <label className="mt-2 border-dashed border-2 h-28 rounded flex flex-col items-center justify-center cursor-pointer bg-slate-50">
              {loadingImage ? (
                <Loading />
              ) : (
                <>
                  <FaCloudUploadAlt size={28} />
                  <p className="text-sm">Upload Image</p>
                </>
              )}
              <input hidden type="file" accept="image/*" onChange={handleUploadImage} />
            </label>

            <div className="flex flex-wrap gap-3 mt-3">
              {data.image.map((img, i) => (
                <div key={i} className="w-20 h-20 relative group border rounded">
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-contain cursor-pointer"
                    onClick={() => setViewImageURL(img)}
                  />
                  <button
                    type="button"
                    onClick={() => removeItem("image", i)}
                    className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded hidden group-hover:block"
                  >
                    <MdDelete size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* CATEGORY */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="font-medium text-sm">Category</label>
              <select
                className="w-full mt-1 p-2 border rounded bg-slate-50"
                onChange={(e) => {
                  const cat = allCategory.find((c) => c._id === e.target.value);
                  if (!cat) return;
                  setData((p) => ({
                    ...p,
                    category: [...p.category, cat],
                  }));
                }}
              >
                <option value="">Select Category</option>
                {allCategory.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <div className="flex flex-wrap gap-2 mt-2">
                {data.category.map((c, i) => (
                  <span
                    key={i}
                    className="bg-slate-100 px-2 py-1 rounded text-sm flex items-center gap-1"
                  >
                    {c.name}
                    <IoClose
                      className="cursor-pointer"
                      onClick={() => removeItem("category", i)}
                    />
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="font-medium text-sm">Sub Category</label>
              <select
                className="w-full mt-1 p-2 border rounded bg-slate-50"
                onChange={(e) => {
                  const sc = allSubCategory.find(
                    (s) => s._id === e.target.value
                  );
                  if (!sc) return;
                  setData((p) => ({
                    ...p,
                    subCategory: [...p.subCategory, sc],
                  }));
                }}
              >
                <option value="">Select Sub Category</option>
                {allSubCategory.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* PRICE */}
          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="price"
              placeholder="Price"
              value={data.price}
              onChange={handleChange}
              className="p-2 border rounded bg-slate-50"
              required
            />
            <input
              name="discount"
              placeholder="Discount %"
              value={data.discount}
              onChange={handleChange}
              className="p-2 border rounded bg-slate-50"
            />
          </div>

          {/* EXTRA FIELDS */}
          {Object.keys(data.more_details).map((k) => (
            <input
              key={k}
              placeholder={k}
              value={data.more_details[k]}
              onChange={(e) =>
                setData((p) => ({
                  ...p,
                  more_details: { ...p.more_details, [k]: e.target.value },
                }))
              }
              className="p-2 border rounded bg-slate-50"
            />
          ))}

          <button
            type="button"
            onClick={() => setOpenAddField(true)}
            className="border px-4 py-1 rounded w-fit hover:bg-slate-100"
          >
            + Add Custom Field
          </button>

          {/* SUBMIT */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold">
            Update Product
          </button>
        </form>
      </div>

      {/* MODALS */}
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

export default EditProductAdmin;
