import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import Divider from "../components/Divider";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "../components/AddToCartButton";

const ProductDisplayPage = () => {
  const params = useParams();
  const productId = params?.product?.split("-")?.slice(-1)[0];

  const [data, setData] = useState({
    name: "",
    image: [],
  });

  const [image, setImage] = useState(0);
  const imageContainer = useRef();

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: { productId },
      });

      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 120;
  };

  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 120;
  };

  return (
    <section className="container mx-auto p-4 grid lg:grid-cols-2 gap-6">
      {/* LEFT IMAGE SECTION */}
      <div>
        <div className="bg-white rounded min-h-56 lg:min-h-[65vh] flex items-center justify-center">
          <img
            src={data.image[image]}
            className="w-full h-full object-contain"
            alt={data.name}
          />
        </div>

        {/* IMAGE INDICATORS */}
        <div className="flex justify-center gap-2 my-2">
          {data.image.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === image ? "bg-slate-400" : "bg-slate-200"
              }`}
            ></div>
          ))}
        </div>

        {/* IMAGE THUMBNAILS */}
        <div className="relative">
          <div
            ref={imageContainer}
            className="flex gap-4 overflow-x-auto scrollbar-none"
          >
            {data.image.map((img, index) => (
              <div
                key={index}
                className="w-20 h-20 cursor-pointer shadow rounded"
                onClick={() => setImage(index)}
              >
                <img
                  src={img}
                  alt="thumbnail"
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          <div className="hidden lg:flex absolute inset-y-0 left-0 right-0 justify-between items-center px-2">
            <button
              onClick={handleScrollLeft}
              className="bg-white p-1 rounded-full shadow"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={handleScrollRight}
              className="bg-white p-1 rounded-full shadow"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* DESCRIPTION (DESKTOP) */}
        <div className="hidden lg:grid gap-3 mt-4">
          <div>
            <p className="font-semibold">Description</p>
            <p>{data.description}</p>
          </div>
          <div>
            <p className="font-semibold">Unit</p>
            <p>{data.unit}</p>
          </div>
          {data.more_details &&
            Object.keys(data.more_details).map((key) => (
              <div key={key}>
                <p className="font-semibold">{key}</p>
                <p>{data.more_details[key]}</p>
              </div>
            ))}
        </div>
      </div>

      {/* RIGHT DETAILS SECTION */}
      <div className="p-4 lg:pl-7">
        <p className="bg-green-300 w-fit px-2 rounded-full text-sm">10 Min</p>
        <h2 className="text-lg lg:text-3xl font-semibold">{data.name}</h2>
        <p>{data.unit}</p>

        <Divider />

        {/* PRICE */}
        <div>
          <p>Price</p>
          <div className="flex items-center gap-4 mt-1">
            <div className="border border-green-600 px-4 py-2 rounded bg-green-50">
              <p className="font-semibold text-lg">
                {DisplayPriceInRupees(
                  pricewithDiscount(data.price, data.discount)
                )}
              </p>
            </div>

            {data.discount && (
              <>
                <p className="line-through">
                  {DisplayPriceInRupees(data.price)}
                </p>
                <p className="font-bold text-green-600">
                  {data.discount}% Discount
                </p>
              </>
            )}
          </div>
        </div>

        {/* ADD TO CART */}
        {data.stock === 0 ? (
          <p className="text-red-500 mt-4">Out of Stock</p>
        ) : (
          <div className="my-4">
            <AddToCartButton data={data} />
          </div>
        )}

        {/* WHY SHOP SECTION (UPDATED) */}
        <h2 className="font-semibold text-lg mt-6 mb-4">
          Why shop from <span className="text-blue-600">Pragra Shop</span>?
        </h2>

        <div className="grid gap-4">
          <div className="flex gap-4 bg-slate-50 p-4 rounded-xl border">
            <span className="text-2xl">⚡</span>
            <div>
              <p className="font-semibold">Superfast Delivery</p>
              <p className="text-sm text-neutral-600">
                Quick deliveries from nearby fulfillment centers.
              </p>
            </div>
          </div>

          <div className="flex gap-4 bg-slate-50 p-4 rounded-xl border">
            <span className="text-2xl">💰</span>
            <div>
              <p className="font-semibold">Best Prices & Offers</p>
              <p className="text-sm text-neutral-600">
                Competitive pricing with exciting deals.
              </p>
            </div>
          </div>

          <div className="flex gap-4 bg-slate-50 p-4 rounded-xl border">
            <span className="text-2xl">🛍️</span>
            <div>
              <p className="font-semibold">Wide Assortment</p>
              <p className="text-sm text-neutral-600">
                Thousands of products across multiple categories.
              </p>
            </div>
          </div>

          <div className="flex gap-4 bg-slate-50 p-4 rounded-xl border">
            <span className="text-2xl">🔒</span>
            <div>
              <p className="font-semibold">Secure Payments</p>
              <p className="text-sm text-neutral-600">
                Safe and trusted payment gateways.
              </p>
            </div>
          </div>
        </div>

        {/* DESCRIPTION (MOBILE) */}
        <div className="lg:hidden grid gap-3 mt-6">
          <div>
            <p className="font-semibold">Description</p>
            <p>{data.description}</p>
          </div>
          <div>
            <p className="font-semibold">Unit</p>
            <p>{data.unit}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;
