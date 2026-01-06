import React from "react";
import { IoClose } from "react-icons/io5";

const ViewImage = ({ url, close }) => {
  return (
    <section className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] p-4 animate-scaleIn">

        {/* CLOSE BUTTON */}
        <button
          onClick={close}
          className="absolute -top-3 -right-3 bg-white shadow rounded-full p-1 hover:bg-red-500 hover:text-white transition"
        >
          <IoClose size={22} />
        </button>

        {/* IMAGE */}
        <div className="flex justify-center items-center max-h-[80vh] overflow-hidden">
          <img
            src={url}
            alt="Preview"
            className="max-w-full max-h-[80vh] object-contain rounded"
          />
        </div>

      </div>
    </section>
  );
};

export default ViewImage;
