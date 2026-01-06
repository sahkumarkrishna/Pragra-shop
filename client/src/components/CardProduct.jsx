import React from "react";
import { Link } from "react-router-dom";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { valideURLConvert } from "../utils/valideURLConvert";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "./AddToCartButton";

const CardProduct = ({ data }) => {
  const url = `/product/${valideURLConvert(data.name)}-${data._id}`;

  return (
    <Link
      to={url}
      className="bg-white border rounded-xl p-3 lg:p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-all duration-200"
    >
      {/* IMAGE */}
      <div className="w-full h-32 lg:h-40 flex items-center justify-center bg-slate-50 rounded-lg overflow-hidden">
        <img
          src={data.image?.[0]}
          alt={data.name}
          className="h-full object-contain hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* BADGES */}
      <div className="flex items-center gap-2 text-xs">
        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
          10 min
        </span>

        {data.discount && (
          <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
            {data.discount}% OFF
          </span>
        )}
      </div>

      {/* PRODUCT NAME */}
      <h3 className="text-sm lg:text-base font-medium line-clamp-2">
        {data.name}
      </h3>

      {/* PRICE + CART */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="font-semibold text-sm lg:text-base">
            {DisplayPriceInRupees(
              pricewithDiscount(data.price, data.discount)
            )}
          </span>

          {data.discount && (
            <span className="text-xs text-gray-400 line-through">
              {DisplayPriceInRupees(data.price)}
            </span>
          )}
        </div>

        {data.stock === 0 ? (
          <span className="text-red-500 text-xs font-medium">
            Out of stock
          </span>
        ) : (
          <AddToCartButton data={data} />
        )}
      </div>
    </Link>
  );
};

export default CardProduct;
