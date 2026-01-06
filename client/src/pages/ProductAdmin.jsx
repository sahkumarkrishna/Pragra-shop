import React, { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import Loading from "../components/Loading";
import ProductCardAdmin from "../components/ProductCardAdmin";
import { IoSearchOutline } from "react-icons/io5";

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page,
          limit: 12,
          search,
        },
      });

      if (response.data.success) {
        setProductData(response.data.data);
        setTotalPageCount(response.data.totalNoPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);

  // Debounced Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchProductData();
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const handleNext = () => {
    if (page < totalPageCount) setPage((p) => p + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  return (
    <section className="bg-slate-50 min-h-screen p-4">

      {/* HEADER */}
      <div className="bg-white rounded-lg shadow p-4 flex flex-wrap items-center gap-4">
        <h2 className="text-lg font-semibold">Manage Products</h2>

        {/* SEARCH */}
        <div className="ml-auto w-full sm:w-64 bg-slate-100 flex items-center gap-2 px-3 py-2 rounded-lg border focus-within:border-blue-500">
          <IoSearchOutline size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent w-full outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="mt-6 bg-white rounded-lg shadow p-4">

        {/* LOADING */}
        {loading && <Loading />}

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 min-h-[55vh]">
          {productData.map((product, index) => (
            <ProductCardAdmin
              key={product._id + index}
              data={product}
              fetchProductData={fetchProductData}
            />
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between mt-6 gap-4">
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className="px-4 py-2 border rounded-lg hover:bg-slate-100 disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-sm font-medium">
            Page {page} of {totalPageCount}
          </span>

          <button
            onClick={handleNext}
            disabled={page === totalPageCount}
            className="px-4 py-2 border rounded-lg hover:bg-slate-100 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductAdmin;
