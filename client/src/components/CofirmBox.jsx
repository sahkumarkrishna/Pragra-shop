import React from "react";
import { IoClose } from "react-icons/io5";
import { MdWarning } from "react-icons/md";

const CofirmBox = ({ cancel, confirm, close }) => {
  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-2xl animate-scaleIn">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2 text-red-600">
            <MdWarning size={22} />
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
          </div>
          <button
            onClick={close}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <IoClose size={22} />
          </button>
        </div>

        {/* BODY */}
        <div className="px-5 py-4 text-sm text-gray-600">
          <p>
            This action <span className="font-semibold text-red-600">cannot be undone</span>.
            Are you sure you want to permanently delete this item?
          </p>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 border-t px-5 py-4">
          <button
            onClick={cancel}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={confirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </section>
  );
};

export default CofirmBox;
