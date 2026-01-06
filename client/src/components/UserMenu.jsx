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

  const handleClose = () => close?.();

  return (
    <div className="w-64 text-sm">

      {/* USER INFO */}
      <div className="px-2">
        <p className="font-semibold text-base">My Account</p>

        <div className="flex items-center justify-between mt-1 gap-2">
          <p className="truncate max-w-[180px] text-gray-700">
            {user.name || user.mobile}
            {user.role === "ADMIN" && (
              <span className="ml-1 text-xs font-medium text-red-600">
                (Admin)
              </span>
            )}
          </p>

          <Link
            to="/dashboard/profile"
            onClick={handleClose}
            className="text-gray-500 hover:text-primary-200"
            title="View Profile"
          >
            <HiOutlineExternalLink size={16} />
          </Link>
        </div>
      </div>

      <Divider />

      {/* MENU LINKS */}
      <div className="grid gap-1">
        {isAdmin(user.role) && (
          <>
            <MenuItem
              label="Category"
              to="/dashboard/category"
              onClick={handleClose}
            />
            <MenuItem
              label="Sub Category"
              to="/dashboard/subcategory"
              onClick={handleClose}
            />
            <MenuItem
              label="Upload Product"
              to="/dashboard/upload-product"
              onClick={handleClose}
            />
            <MenuItem
              label="Product"
              to="/dashboard/product"
              onClick={handleClose}
            />

            <Divider className="my-2" />
          </>
        )}

        <MenuItem
          label="My Orders"
          to="/dashboard/myorders"
          onClick={handleClose}
        />

        <MenuItem
          label="Saved Address"
          to="/dashboard/address"
          onClick={handleClose}
        />

        <button
          onClick={handleLogout}
          className="text-left px-3 py-2 rounded hover:bg-red-100 text-red-600 font-medium"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;

/* Reusable Menu Item */
const MenuItem = ({ label, to, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="px-3 py-2 rounded hover:bg-orange-100 transition"
  >
    {label}
  </Link>
);
