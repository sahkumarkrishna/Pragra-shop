import React from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import AddToCartButton from "./AddToCartButton";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import imageEmpty from "../assets/empty_cart.webp";
import toast from "react-hot-toast";

const DisplayCartItem = ({ close }) => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const redirectToCheckoutPage = () => {
    if (user?._id) {
      navigate("/checkout");
      close?.();
      return;
    }
    toast.error("Please login to continue");
  };

  return (
    <section className="fixed inset-0 z-50 bg-black/60 flex justify-end">
      <div className="w-full max-w-sm h-full bg-white flex flex-col shadow-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-lg font-semibold">My Cart</h2>
          <button onClick={close} className="text-gray-600 hover:text-red-500">
            <IoClose size={22} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto bg-slate-50 px-3 py-4 space-y-4">

          {cartItem.length > 0 ? (
            <>
              {/* SAVINGS */}
              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg flex justify-between text-sm font-medium">
                <span>Total Savings</span>
                <span>
                  {DisplayPriceInRupees(
                    notDiscountTotalPrice - totalPrice
                  )}
                </span>
              </div>

              {/* CART ITEMS */}
              <div className="bg-white rounded-xl p-3 space-y-4">
                {cartItem.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-3 items-start"
                  >
                    <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                      <img
                        src={item.productId.image[0]}
                        alt={item.productId.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 text-sm">
                      <p className="font-medium line-clamp-2">
                        {item.productId.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {item.productId.unit}
                      </p>
                      <p className="font-semibold text-green-700 mt-1">
                        {DisplayPriceInRupees(
                          pricewithDiscount(
                            item.productId.price,
                            item.productId.discount
                          )
                        )}
                      </p>
                    </div>

                    <AddToCartButton data={item.productId} />
                  </div>
                ))}
              </div>

              {/* BILL DETAILS */}
              <div className="bg-white rounded-xl p-4 space-y-2 text-sm">
                <h3 className="font-semibold">Bill Details</h3>

                <div className="flex justify-between">
                  <span>Items Total</span>
                  <span>
                    <span className="line-through text-gray-400 mr-1">
                      {DisplayPriceInRupees(notDiscountTotalPrice)}
                    </span>
                    {DisplayPriceInRupees(totalPrice)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Total Quantity</span>
                  <span>{totalQty} items</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>

                <div className="flex justify-between font-semibold text-base border-t pt-2">
                  <span>Grand Total</span>
                  <span>{DisplayPriceInRupees(totalPrice)}</span>
                </div>
              </div>
            </>
          ) : (
            /* EMPTY CART */
            <div className="h-full flex flex-col items-center justify-center text-center gap-4">
              <img
                src={imageEmpty}
                alt="Empty Cart"
                className="w-48"
              />
              <p className="text-gray-500">Your cart is empty</p>
              <Link
                to="/"
                onClick={close}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>

        {/* FOOTER */}
        {cartItem.length > 0 && (
          <div className="p-3 border-t bg-white">
            <button
              onClick={redirectToCheckoutPage}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex justify-between items-center px-4 font-semibold"
            >
              <span>{DisplayPriceInRupees(totalPrice)}</span>
              <span className="flex items-center gap-1">
                Proceed <FaCaretRight />
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default DisplayCartItem;
