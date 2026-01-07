import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

  const goTo = (path) => {
    close?.();          // ✅ mobile close
    navigate(path);     // ✅ route change
  };

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
    <div className="w-64 text-sm pointer-events-auto">

      {/* USER INFO */}
      <div className="px-3 py-2">
        <p className="font-semibold text-base">My Account</p>

        <div className="flex items-center justify-between mt-1">
          <p className="truncate max-w-[180px] text-gray-700">
            {user.name || user.mobile}
            {user.role === "ADMIN" && (
              <span className="ml-1 text-xs text-red-600 font-medium">
                (Admin)
              </span>
            )}
          </p>

          <button
            onClick={() => goTo("/dashboard/profile")}
            className="text-gray-500 hover:text-orange-500"
          >
            <HiOutlineExternalLink size={16} />
          </button>
        </div>
      </div>

      <Divider />

      {/* MENU */}
      <div className="flex flex-col gap-1">

        {isAdmin(user.role) && (
          <>
            <MenuButton label="Category" onClick={() => goTo("/dashboard/category")} />
            <MenuButton label="Sub Category" onClick={() => goTo("/dashboard/subcategory")} />
            <MenuButton label="Upload Product" onClick={() => goTo("/dashboard/upload-product")} />
            <MenuButton label="Product" onClick={() => goTo("/dashboard/product")} />
            <Divider className="my-2" />
          </>
        )}

        <MenuButton label="My Orders" onClick={() => goTo("/dashboard/myorders")} />
        <MenuButton label="Saved Address" onClick={() => goTo("/dashboard/address")} />

        <button
          onClick={handleLogout}
          className="text-left w-full px-3 py-2 rounded hover:bg-red-100 text-red-600 font-medium"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;

/* ✅ MOBILE-SAFE BUTTON */
const MenuButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left px-3 py-2 rounded hover:bg-orange-100 active:bg-orange-200 transition"
  >
    {label}
  </button>
);
