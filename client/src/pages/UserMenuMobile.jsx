import React from "react";
import { IoClose } from "react-icons/io5";
import UserMenu from "../components/UserMenu";

const UserMenuMobile = () => {
  return (
    <section className="fixed inset-0 z-50 bg-white flex flex-col">

      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b shadow-sm">
        <h2 className="font-semibold text-lg">My Account</h2>
        <button
          onClick={() => window.history.back()}
          className="text-neutral-700 hover:text-red-500"
        >
          <IoClose size={26} />
        </button>
      </div>

      {/* MENU CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <UserMenu close={() => window.history.back()} />
      </div>

    </section>
  );
};

export default UserMenuMobile;
