import React, { useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import AddAddress from "../components/AddAddress";
import { useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutPage = () => {
  const {
    notDiscountTotalPrice,
    totalPrice,
    totalQty,
    fetchCartItem,
    fetchOrder,
  } = useGlobalContext();

  const [openAddress, setOpenAddress] = useState(false);
  const [selectAddress, setSelectAddress] = useState(null);

  const addressList = useSelector((state) => state.addresses.addressList);
  const cartItemsList = useSelector((state) => state.cartItem.cart);

  const navigate = useNavigate();

  /* ================= CASH ON DELIVERY ================= */
  const handleCashOnDelivery = async () => {
    if (selectAddress === null) {
      toast.error("Please select an address");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchCartItem?.();
        fetchOrder?.();
        navigate("/success", { state: { text: "Order placed successfully" } });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  /* ================= ONLINE PAYMENT ================= */
  const handleOnlinePayment = async () => {
    if (selectAddress === null) {
      toast.error("Please select an address");
      return;
    }

    try {
      toast.loading("Redirecting to payment...");
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLIC_KEY
      );

      const response = await Axios({
        ...SummaryApi.payment_url,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        },
      });

      await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="bg-slate-100 min-h-screen py-6">
      <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-6">

        {/* ================= ADDRESS SECTION ================= */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Delivery Address</h3>
            <button
              onClick={() => setOpenAddress(true)}
              className="text-sm text-blue-600 hover:underline"
            >
              + Add New
            </button>
          </div>

          <div className="grid gap-3">
            {addressList?.length === 0 && (
              <p className="text-sm text-gray-500">
                No address found. Please add one.
              </p>
            )}

            {addressList.map((address, index) => (
              address.status && (
                <label
                  key={address._id}
                  className={`border rounded-lg p-4 cursor-pointer transition
                  ${
                    selectAddress === index
                      ? "border-green-600 bg-green-50"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex gap-3">
                    <input
                      type="radio"
                      name="address"
                      checked={selectAddress === index}
                      onChange={() => setSelectAddress(index)}
                    />
                    <div className="text-sm">
                      <p className="font-medium">{address.address_line}</p>
                      <p>{address.city}, {address.state}</p>
                      <p>{address.country} - {address.pincode}</p>
                      <p className="text-gray-600">{address.mobile}</p>
                    </div>
                  </div>
                </label>
              )
            ))}
          </div>
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="bg-white rounded-xl shadow p-4 h-fit">
          <h3 className="text-lg font-semibold mb-3">Order Summary</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span className="line-through text-gray-400">
                {DisplayPriceInRupees(notDiscountTotalPrice)}
              </span>
            </div>

            <div className="flex justify-between font-medium">
              <span>Discounted Price</span>
              <span>{DisplayPriceInRupees(totalPrice)}</span>
            </div>

            <div className="flex justify-between">
              <span>Total Quantity</span>
              <span>{totalQty} items</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-green-600">FREE</span>
            </div>

            <hr />

            <div className="flex justify-between font-semibold text-base">
              <span>Grand Total</span>
              <span className="text-green-700">
                {DisplayPriceInRupees(totalPrice)}
              </span>
            </div>
          </div>

          {/* ================= ACTION BUTTONS ================= */}
          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={handleOnlinePayment}
              className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Pay Online
            </button>

            <button
              onClick={handleCashOnDelivery}
              className="border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white py-2 rounded-lg font-semibold transition"
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      </div>

      {/* ================= ADD ADDRESS MODAL ================= */}
      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
    </section>
  );
};

export default CheckoutPage;
