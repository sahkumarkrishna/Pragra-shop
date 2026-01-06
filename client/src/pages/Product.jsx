import React, { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import { Link } from "react-router-dom";

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: { page },
      });

      if (response.data.success) {
        setProductData(response.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <section className="container mx-auto px-4 py-6 bg-slate-50 min-h-screen">
      
      {/* PAGE TITLE */}
      <h1 className="text-xl lg:text-2xl font-semibold mb-6 text-slate-800">
        All Products
      </h1>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

        {/* LOADING SKELETON */}
        {loading &&
          new Array(10).fill(null).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-3 shadow animate-pulse"
            >
              <div className="h-32 bg-slate-200 rounded mb-3"></div>
              <div className="h-4 bg-slate-200 rounded mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            </div>
          ))}

        {/* PRODUCT CARDS */}
        {!loading &&
          productData.map((product) => (
            <Link
              to={`/product/${product.name}-${product._id}`}
              key={product._id}
              className="bg-white rounded-xl p-3 shadow hover:shadow-lg transition flex flex-col"
            >
              {/* IMAGE */}
              <div className="h-36 flex items-center justify-center">
                <img
                  src={product.image?.[0]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* NAME */}
              <p className="text-sm font-medium mt-2 line-clamp-2">
                {product.name}
              </p>

              {/* UNIT */}
              <p className="text-xs text-neutral-500">{product.unit}</p>

              {/* PRICE */}
              <div className="mt-2">
                <p className="font-semibold text-sm text-green-700">
                  {DisplayPriceInRupees(
                    pricewithDiscount(product.price, product.discount)
                  )}
                </p>

                {product.discount && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="line-through text-neutral-400">
                      {DisplayPriceInRupees(product.price)}
                    </span>
                    <span className="text-green-600 font-semibold">
                      {product.discount}% OFF
                    </span>
                  </div>
                )}
              </div>

              {/* CTA */}
              <button className="mt-auto bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg py-1.5 mt-3">
                View Product
              </button>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default Product;
