import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useSelector } from "react-redux";

import Search from "./Search";
import UserMenu from "./UserMenu";
import DisplayCartItem from "./DisplayCartItem";
import useMobile from "../hooks/useMobile";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { useGlobalContext } from "../provider/GlobalProvider";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state) => state?.user);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const { totalPrice, totalQty } = useGlobalContext();

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openCartSection, setOpenCartSection] = useState(false);

  const isSearchPage = location.pathname === "/search";

  const handleMobileUser = () => {
    if (!user?._id) return navigate("/login");
    navigate("/user");
  };

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto h-16 lg:h-20 px-3 lg:px-6 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center font-bold select-none">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-lg mr-2 shadow">
              P
            </span>
            <span className="text-xl lg:text-2xl text-blue-700">Pragra</span>
            <span className="text-xl lg:text-2xl text-gray-700 ml-1">Shop</span>
          </Link>

          {/* SEARCH (Desktop Only) */}
          <div className="hidden lg:block w-[42%]">
            <Search />
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4 lg:gap-6">

            {/* Mobile User */}
            <button
              className="lg:hidden text-gray-600"
              onClick={handleMobileUser}
            >
              <FaRegCircleUser size={24} />
            </button>

            {/* Desktop User Menu */}
            <div className="hidden lg:block relative">
              {user?._id ? (
                <>
                  <button
                    onClick={() => setOpenUserMenu((p) => !p)}
                    className="flex items-center gap-1 font-medium hover:text-blue-600"
                  >
                    Account
                    {openUserMenu ? <GoTriangleUp /> : <GoTriangleDown />}
                  </button>

                  {openUserMenu && (
                    <div className="absolute right-0 top-11 bg-white shadow-xl rounded-lg p-4 min-w-[200px]">
                      <UserMenu close={() => setOpenUserMenu(false)} />
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="font-medium hover:text-blue-600"
                >
                  Login
                </button>
              )}
            </div>

            {/* CART */}
            <button
              onClick={() => setOpenCartSection(true)}
              className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white px-3 lg:px-4 py-2 rounded-lg"
            >
              <BsCart4 size={22} />
              <div className="hidden sm:block text-sm text-left">
                {cartItem.length > 0 ? (
                  <>
                    <p>{totalQty} Items</p>
                    <p className="font-semibold">
                      {DisplayPriceInRupees(totalPrice)}
                    </p>
                  </>
                ) : (
                  <p className="font-medium">My Cart</p>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH */}
        {!isSearchPage && isMobile && (
          <div className="px-3 pb-3 lg:hidden">
            <Search />
          </div>
        )}
      </header>

      {/* CART DRAWER */}
      {openCartSection && (
        <DisplayCartItem close={() => setOpenCartSection(false)} />
      )}
    </>
  );
};

export default Header;
