import React from "react";
import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const Cancel = () => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 flex flex-col items-center text-center gap-4">

        {/* CANCEL ICON */}
        <div className="text-red-600 text-6xl animate-pulse">
          <FaTimesCircle />
        </div>

        {/* TITLE */}
        <h2 className="text-xl font-bold text-slate-800">
          Order Cancelled
        </h2>

        {/* MESSAGE */}
        <p className="text-red-700 font-medium">
          Your order has been cancelled.
        </p>

        <p className="text-sm text-slate-500">
          Don’t worry — no payment was processed.  
          You can continue shopping anytime.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 mt-4">
          <Link
            to="/"
            className="px-5 py-2 rounded-lg border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
          >
            Go to Home
          </Link>

          <Link
            to="/cart"
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Go to Cart
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cancel;
