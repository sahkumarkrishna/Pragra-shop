import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import { handleAddAddress } from "../store/addressSlice";
import { setOrder } from "../store/orderSlice";

export const GlobalContext = createContext(null);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();

  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state.user);

  const [totalPrice, setTotalPrice] = useState(0);
  const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);

  /* ================= CART ================= */
  const fetchCartItem = async () => {
    try {
      const response = await Axios({ ...SummaryApi.getCartItem });
      if (response.data.success) {
        dispatch(handleAddItemCart(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data: { _id: id, qty },
      });

      if (response.data.success) {
        fetchCartItem();
        return response.data;
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const deleteCartItem = async (cartId) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data: { _id: cartId },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  /* ================= PRICE CALCULATION ================= */
  useEffect(() => {
    const qty = cartItem.reduce((sum, item) => sum + item.quantity, 0);
    setTotalQty(qty);

    const discountedPrice = cartItem.reduce((sum, item) => {
      const priceAfterDiscount = pricewithDiscount(
        item?.productId?.price,
        item?.productId?.discount
      );
      return sum + priceAfterDiscount * item.quantity;
    }, 0);

    setTotalPrice(discountedPrice);

    const originalPrice = cartItem.reduce(
      (sum, item) => sum + item?.productId?.price * item.quantity,
      0
    );
    setNotDiscountTotalPrice(originalPrice);
  }, [cartItem]);

  /* ================= ADDRESS ================= */
  const fetchAddress = async () => {
    try {
      const response = await Axios({ ...SummaryApi.getAddress });
      if (response.data.success) {
        dispatch(handleAddAddress(response.data.data));
      }
    } catch (error) {}
  };

  /* ================= ORDERS ================= */
  const fetchOrder = async () => {
    try {
      const response = await Axios({ ...SummaryApi.getOrderItems });
      if (response.data.success) {
        dispatch(setOrder(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= USER CHANGE ================= */
  useEffect(() => {
    if (user?._id) {
      fetchCartItem();
      fetchAddress();
      fetchOrder();
    } else {
      // user logged out
      dispatch(handleAddItemCart([]));
      dispatch(handleAddAddress([]));
      dispatch(setOrder([]));
    }
  }, [user]);

  /* ================= LOGOUT (MANUAL) ================= */
  const handleLogoutOut = () => {
    localStorage.clear();
    dispatch(handleAddItemCart([]));
    dispatch(handleAddAddress([]));
    dispatch(setOrder([]));
  };

  return (
    <GlobalContext.Provider
      value={{
        fetchCartItem,
        updateCartItem,
        deleteCartItem,
        fetchAddress,
        fetchOrder,
        handleLogoutOut,
        totalPrice,
        totalQty,
        notDiscountTotalPrice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
