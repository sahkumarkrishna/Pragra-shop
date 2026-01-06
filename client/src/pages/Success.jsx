import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const Success = () => {
  const location = useLocation();
  const message =
    location?.state?.text || "Payment completed successfully";

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 flex flex-col items-center text-center gap-4">

        {/* SUCCESS ICON */}
        <div className="text-green-600 text-6xl animate-bounce">
          <FaCheckCircle />
        </div>

        {/* MESSAGE */}
        <h2 className="text-xl font-bold text-slate-800">
          Success 🎉
        </h2>

        <p className="text-green-700 font-medium">
          {message}
        </p>

        <p className="text-sm text-slate-500">
          Thank you for shopping with us. Your order is being processed.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 mt-4">
          <Link
            to="/"
            className="px-5 py-2 rounded-lg border border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition"
          >
            Go to Home
          </Link>

          <Link
            to="/orders"
            className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            View Orders
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Success;
