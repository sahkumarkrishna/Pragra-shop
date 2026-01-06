import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { valideURLConvert } from "../utils/valideURLConvert";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import HomeBanner from "./HomeBanner";

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find((sub) =>
      sub.category.some((c) => c._id === id)
    );

    if (!subcategory) return;

    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(
      subcategory.name
    )}-${subcategory._id}`;

    navigate(url);
  };

  return (
    <section className="bg-slate-50">

      {/* ================= AUTO BANNER ================= */}
      <HomeBanner />

      {/* ================= CATEGORY GRID ================= */}
      <div className="container mx-auto px-4 my-10">
        <h2 className="text-lg lg:text-xl font-semibold text-slate-800 mb-4">
          Shop by Category
        </h2>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
          {loadingCategory
            ? new Array(10).fill(null).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-3 h-28 shadow animate-pulse"
                >
                  <div className="bg-slate-200 h-16 rounded mb-2"></div>
                  <div className="bg-slate-200 h-4 rounded"></div>
                </div>
              ))
            : categoryData.map((cat) => (
                <div
                  key={cat._id}
                  onClick={() =>
                    handleRedirectProductListpage(cat._id, cat.name)
                  }
                  className="bg-white rounded-xl p-3 shadow hover:shadow-lg hover:scale-105 cursor-pointer transition-all"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-16 object-contain"
                  />
                  <p className="text-center text-xs mt-2 font-medium text-slate-700">
                    {cat.name}
                  </p>
                </div>
              ))}
        </div>
      </div>

      {/* ================= CATEGORY PRODUCTS ================= */}
      <div className="space-y-12 pb-10">
        {categoryData?.map((c) => (
          <CategoryWiseProductDisplay
            key={c._id}
            id={c._id}
            name={c.name}
          />
        ))}
      </div>

    </section>
  );
};

export default Home;
