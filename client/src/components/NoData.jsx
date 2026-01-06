import React from "react";
import noDataImage from "../assets/nothing here yet.webp";

const NoData = ({ text = "No data found", className = "" }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center gap-3 py-10 ${className}`}
    >
      <img
        src={noDataImage}
        alt="No data available"
        className="w-32 md:w-40 opacity-90"
      />

      <p className="text-sm md:text-base text-gray-500 font-medium">
        {text}
      </p>
    </div>
  );
};

export default NoData;
