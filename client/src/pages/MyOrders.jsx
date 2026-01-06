// pages/MyOrders.jsx
import React from "react";
import { useSelector } from "react-redux";
import NoData from "../components/NoData";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import OrderStatusBadge from "./OrderStatusBadge";

const MyOrders = () => {
  const orders = useSelector((state) => state.orders.order);
  const user = useSelector((state) => state.user);

  if (!orders?.length) return <NoData />;

  return (
    <section className="bg-blue-50 min-h-[75vh] p-4">
      <div className="bg-white rounded-xl shadow-sm p-4 mb-5">
        <h1 className="text-xl font-semibold">My Orders</h1>
        <p className="text-sm text-gray-500">
          Track your order status and totals
        </p>
      </div>

      <div className="grid gap-5">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl border shadow-sm p-4 hover:shadow-md transition"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">Order ID</p>
                <p className="font-semibold">#{order.orderId}</p>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>

            {/* Product */}
            <div className="flex gap-4 items-center mt-4">
              <img
                src={order.product_details.image[0]}
                alt={order.product_details.name}
                className="w-16 h-16 object-contain border rounded-lg bg-white"
              />
              <div className="flex-1">
                <p className="font-medium line-clamp-1">
                  {order.product_details.name}
                </p>
                <p className="text-sm text-gray-500">
                  Ordered by {user?.name || "User"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Total</p>
                <p className="text-lg font-bold">
                  {DisplayPriceInRupees(order.totalAmount)}
                </p>
              </div>
            </div>

            {/* Meta */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 text-sm">
              <div>
                <p className="text-gray-500">Order Date</p>
                <p className="font-medium">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Payment</p>
                <p className="font-medium">
                  {order.paymentMethod || "Online"}
                </p>
              </div>
              <div className="hidden sm:block">
                <p className="text-gray-500">Status</p>
                <p className="font-medium">{order.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyOrders;
