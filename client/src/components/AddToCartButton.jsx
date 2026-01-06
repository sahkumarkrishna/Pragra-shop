import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa6";

const AddToCartButton = ({ data }) => {
  const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);

  const [loading, setLoading] = useState(false);
  const [isAvailableCart, setIsAvailableCart] = useState(false);
  const [qty, setQty] = useState(0);
  const [cartItemDetails, setCartItemDetails] = useState(null);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addTocart,
        data: { productId: data?._id },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchCartItem && fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // check if item exists in cart
  useEffect(() => {
    const product = cartItem.find(
      (item) => item.productId._id === data._id
    );

    if (product) {
      setIsAvailableCart(true);
      setQty(product.quantity);
      setCartItemDetails(product);
    } else {
      setIsAvailableCart(false);
      setQty(0);
      setCartItemDetails(null);
    }
  }, [cartItem, data]);

  const increaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const response = await updateCartItem(cartItemDetails?._id, qty + 1);
    if (response?.success) toast.success("Item added");
  };

  const decreaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (qty === 1) {
      deleteCartItem(cartItemDetails?._id);
      toast.success("Item removed");
    } else {
      const response = await updateCartItem(cartItemDetails?._id, qty - 1);
      if (response?.success) toast.success("Item removed");
    }
  };

  return (
    <div className="w-full max-w-[160px]">
      {isAvailableCart ? (
        <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
          <button
            onClick={decreaseQty}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 flex items-center justify-center"
          >
            <FaMinus size={14} />
          </button>

          <span className="flex-1 text-center font-semibold text-sm">
            {qty}
          </span>

          <button
            onClick={increaseQty}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 flex items-center justify-center"
          >
            <FaPlus size={14} />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition disabled:opacity-60"
        >
          {loading ? <Loading /> : "Add to Cart"}
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
