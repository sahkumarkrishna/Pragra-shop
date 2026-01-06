import React from "react";

const Divider = ({ className = "" }) => {
  return (
    <div
      className={`w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent my-4 ${className}`}
    />
  );
};

export default Divider;
