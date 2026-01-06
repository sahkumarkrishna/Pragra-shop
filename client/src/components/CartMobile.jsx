import React from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import { FaCartShopping } from "react-icons/fa6";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { Link } from "react-router-dom";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const CartMobileLink = () => {
  const { totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);

  if (!cartItem.length) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 px-3 lg:hidden">
      <Link
        to="/cart"
        className="flex items-center justify-between bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg active:scale-[0.98] transition"
      >
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div className="bg-green-500 p-2 rounded-full">
            <FaCartShopping size={18} />
          </div>

          <div className="leading-tight">
            <p className="text-xs opacity-90">
              {totalQty} item{totalQty > 1 ? "s" : ""}
            </p>
            <p className="font-semibold text-sm">
              {DisplayPriceInRupees(totalPrice)}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-1 text-sm font-medium">
          <span>View Cart</span>
          <FaCaretRight />
        </div>
      </Link>
    </div>
  );
};

export default CartMobileLink;
