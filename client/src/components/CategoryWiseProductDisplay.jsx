import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct";
import { valideURLConvert } from "../utils/valideURLConvert";

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  const allSubCategory = useSelector(
    (state) => state.product.allSubCategory
  );

  const loadingCards = new Array(6).fill(null);

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: { id },
      });

      if (response.data?.success) {
        setData(response.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchCategoryWiseProduct();
  }, [id]);

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const redirectURL = (() => {
    const sub = allSubCategory.find((s) =>
      s.category?.some((c) => c._id === id)
    );

    if (!sub) return "#";

    return `/${valideURLConvert(name)}-${id}/${valideURLConvert(
      sub.name
    )}-${sub._id}`;
  })();

  return (
    <section className="mb-8">
      <div className="container mx-auto px-4 flex justify-between items-center mb-3">
        <h3 className="text-lg md:text-xl font-semibold">{name}</h3>

        <Link
          to={redirectURL}
          className="text-green-600 hover:text-green-700 text-sm font-medium"
        >
          See all →
        </Link>
      </div>

      <div className="relative">
        <div
          ref={containerRef}
          className="container mx-auto px-4 flex gap-4 overflow-x-auto scrollbar-none scroll-smooth"
        >
          {loading
            ? loadingCards.map((_, i) => <CardLoading key={i} />)
            : data.map((p) => (
                <CardProduct key={p._id} data={p} />
              ))}
        </div>

        {data.length > 4 && (
          <div className="hidden lg:flex absolute inset-0 pointer-events-none">
            <div className="container mx-auto px-2 flex justify-between items-center">
              <button
                onClick={scrollLeft}
                className="pointer-events-auto bg-white shadow p-2 rounded-full"
              >
                <FaAngleLeft />
              </button>
              <button
                onClick={scrollRight}
                className="pointer-events-auto bg-white shadow p-2 rounded-full"
              >
                <FaAngleRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryWiseProductDisplay;
