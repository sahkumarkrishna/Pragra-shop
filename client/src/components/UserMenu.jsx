import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from "../utils/isAdmin";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({ ...SummaryApi.logout });
      if (response.data.success) {
        close?.();
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div
      className="w-64 text-sm bg-white rounded-lg shadow-lg pointer-events-auto"
      onClick={(e) => e.stopPropagation()} // ✅ IMPORTANT
    >

      {/* USER INFO */}
      <div className="px-3 py-2">
        <p className="font-semibold text-base">My Account</p>

        <div className="flex items-center justify-between mt-1">
          <p className="truncate text-gray-700">
            {user.name || user.mobile}
            {user.role === "ADMIN" && (
              <span className="ml-1 text-xs text-red-600">(Admin)</span>
            )}
          </p>

          <Link
            to="/dashboard/profile"
            onClick={close}
            className="p-1"
          >
            <HiOutlineExternalLink size={16} />
          </Link>
        </div>
      </div>

      <Divider />

      {/* MENU */}
      <div className="flex flex-col gap-1">

        {isAdmin(user.role) && (
          <>
            <MenuLink label="Category" to="/dashboard/category" close={close} />
            <MenuLink label="Sub Category" to="/dashboard/subcategory" close={close} />
            <MenuLink label="Upload Product" to="/dashboard/upload-product" close={close} />
            <MenuLink label="Product" to="/dashboard/product" close={close} />
            <Divider className="my-2" />
          </>
        )}

        <MenuLink label="My Orders" to="/dashboard/myorders" close={close} />
        <MenuLink label="Saved Address" to="/dashboard/address" close={close} />

        <button
          onClick={handleLogout}
          className="text-left px-3 py-2 rounded text-red-600 hover:bg-red-100"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;

/* LINK THAT WORKS ON MOBILE */
const MenuLink = ({ label, to, close }) => (
  <Link
    to={to}
    onClick={close}
    className="block w-full px-3 py-2 rounded hover:bg-orange-100 active:bg-orange-200"
  >
    {label}
  </Link>
);
