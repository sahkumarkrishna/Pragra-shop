import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
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
    const images = [...data.image];
    images.splice(index, 1);
    setData((prev) => ({ ...prev, image: images }));
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
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="bg-slate-50 min-h-screen p-4">

      {/* HEADER */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold">Add New Product</h2>
        <p className="text-sm text-gray-500">
          Fill in the details below to add a product to your store
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 grid gap-6 max-w-4xl mx-auto"
      >

        {/* PRODUCT NAME */}
        <div>
          <label className="font-medium">Product Name</label>
          <input
            name="name"
            placeholder="Enter product name (e.g. Wireless Headphones)"
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
            placeholder="Describe the product features, usage, and benefits"
            value={data.description}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 rounded border bg-slate-50 resize-none"
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="font-medium">Product Images</label>
          <label className="mt-2 h-28 border-dashed border-2 rounded flex flex-col items-center justify-center cursor-pointer bg-slate-50">
            {imageLoading ? (
              <Loading />
            ) : (
              <>
                <FaCloudUploadAlt size={30} />
                <p className="text-sm">Click to upload product images</p>
                <p className="text-xs text-gray-500">
                  JPG, PNG (recommended)
                </p>
              </>
            )}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleUploadImage}
            />
          </label>

          <div className="flex flex-wrap gap-3 mt-3">
            {data.image.map((img, index) => (
              <div
                key={img}
                className="w-20 h-20 border rounded relative group"
              >
                <img
                  src={img}
                  alt="product"
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={() => setViewImageURL(img)}
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded hidden group-hover:block"
                >
                  <MdDelete />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORY & SUBCATEGORY */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="font-medium">Category</label>
            <select
              className="w-full mt-1 p-2 border rounded bg-slate-50"
              value={selectCategory}
              onChange={(e) => {
                const cat = allCategory.find(
                  (c) => c._id === e.target.value
                );
                if (!cat) return;
                setData((prev) => ({
                  ...prev,
                  category: [...prev.category, cat],
                }));
                setSelectCategory("");
              }}
            >
              <option value="">Select main category</option>
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
                  className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-sm"
                >
                  {c.name}
                  <IoClose
                    className="cursor-pointer"
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        category: prev.category.filter(
                          (_, idx) => idx !== i
                        ),
                      }))
                    }
                  />
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="font-medium">Sub Category</label>
            <select
              className="w-full mt-1 p-2 border rounded bg-slate-50"
              value={selectSubCategory}
              onChange={(e) => {
                const sc = allSubCategory.find(
                  (s) => s._id === e.target.value
                );
                if (!sc) return;
                setData((prev) => ({
                  ...prev,
                  subCategory: [...prev.subCategory, sc],
                }));
                setSelectSubCategory("");
              }}
            >
              <option value="">Select sub category</option>
              {allSubCategory.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* PRICE & STOCK */}
        <div className="grid gap-4 md:grid-cols-3">
          <input
            name="stock"
            placeholder="Available stock (e.g. 50)"
            value={data.stock}
            onChange={handleChange}
            className="p-2 border rounded bg-slate-50"
          />
          <input
            name="price"
            placeholder="Selling price (₹)"
            value={data.price}
            onChange={handleChange}
            className="p-2 border rounded bg-slate-50"
          />
          <input
            name="discount"
            placeholder="Discount percentage (e.g. 10)"
            value={data.discount}
            onChange={handleChange}
            className="p-2 border rounded bg-slate-50"
          />
        </div>

        {/* EXTRA FIELDS */}
        {Object.keys(data.more_details).map((key) => (
          <input
            key={key}
            placeholder={`Enter ${key}`}
            value={data.more_details[key]}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                more_details: {
                  ...prev.more_details,
                  [key]: e.target.value,
                },
              }))
            }
            className="p-2 border rounded bg-slate-50"
          />
        ))}

        <button
          type="button"
          onClick={() => setOpenAddField(true)}
          className="w-fit border px-4 py-1 rounded hover:bg-slate-100"
        >
          + Add Custom Field
        </button>

        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold">
          Submit Product
        </button>
      </form>

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

export default UploadProduct;
