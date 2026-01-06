import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

import Loading from "../components/Loading";
import CardProduct from "../components/CardProduct";
import { valideURLConvert } from "../utils/valideURLConvert";

const ProductListPage = () => {
  const { category, subCategory } = useParams();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const allSubCategory = useSelector(
    (state) => state.product.allSubCategory
  );
  const [displaySubCategory, setDisplaySubCategory] = useState([]);

  const categoryId = category?.split("-").slice(-1)[0];
  const subCategoryId = subCategory?.split("-").slice(-1)[0];
  const subCategoryName = subCategory
    ?.split("-")
    .slice(0, -1)
    .join(" ");

  const fetchProductData = async () => {
    if (!categoryId || !subCategoryId) return;

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId,
          subCategoryId,
          page,
          limit: 8,
        },
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
    setPage(1);
    setData([]);
  }, [categoryId, subCategoryId]);

  useEffect(() => {
    fetchProductData();
  }, [categoryId, subCategoryId, page]);

  useEffect(() => {
    if (!allSubCategory.length || !categoryId) return;

    const filtered = allSubCategory.filter((s) =>
      s.category?.some((c) => c._id === categoryId)
    );

    setDisplaySubCategory(filtered);
  }, [allSubCategory, categoryId]);

  return (
    <section className="sticky top-24 lg:top-20">
      <div className="container mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]">

        {/* SUB CATEGORY */}
        <div className="min-h-[88vh] max-h-[88vh] overflow-y-auto scrollbarCustom bg-white shadow py-2">
          {displaySubCategory.map((s) => {
            const link = `/${valideURLConvert(
              s.category[0].name
            )}-${s.category[0]._id}/${valideURLConvert(s.name)}-${s._id}`;

            return (
              <Link
                key={s._id}
                to={link}
                className={`flex flex-col lg:flex-row items-center gap-2 p-2 border-b hover:bg-green-100
                ${subCategoryId === s._id ? "bg-green-100" : ""}`}
              >
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-12 h-12 object-scale-down"
                />
                <p className="text-xs lg:text-sm">{s.name}</p>
              </Link>
            );
          })}
        </div>

        {/* PRODUCTS */}
        <div>
          <div className="bg-white shadow p-4 sticky top-20 z-10">
            <h3 className="font-semibold">{subCategoryName}</h3>
          </div>

          <div className="min-h-[80vh] max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {data.map((p) => (
                <CardProduct key={p._id} data={p} />
              ))}
            </div>

            {loading && (
              <div className="flex justify-center py-4">
                <Loading />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
