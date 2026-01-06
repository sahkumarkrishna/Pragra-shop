import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();

  const searchText = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    setIsSearchPage(location.pathname === "/search");
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  const handleOnChange = (e) => {
    navigate(`/search?q=${e.target.value}`);
  };

  return (
    <div className="w-full min-w-[260px] lg:min-w-[420px] h-11 lg:h-12 rounded-full border bg-slate-50 flex items-center overflow-hidden shadow-sm focus-within:border-blue-500 focus-within:bg-white transition">

      {/* LEFT ICON */}
      <div className="flex items-center px-3 text-gray-500">
        {isMobile && isSearchPage ? (
          <Link to="/" className="p-1">
            <FaArrowLeft size={18} />
          </Link>
        ) : (
          <IoSearch size={20} />
        )}
      </div>

      {/* INPUT / PLACEHOLDER */}
      <div className="flex-1 h-full">
        {!isSearchPage ? (
          <div
            onClick={redirectToSearchPage}
            className="h-full flex items-center cursor-text text-gray-500 text-sm lg:text-base"
          >
            <TypeAnimation
              sequence={[
                'Search "iPhone 15"',
                1200,
                'Search "Laptop"',
                1200,
                'Search "Headphones"',
                1200,
                'Search "Shoes"',
                1200,
                'Search "T-Shirts"',
                1200,
                'Search "Milk & Bread"',
                1200,
                'Search "Smart Watch"',
                1200,
                'Search "Chocolates"',
                1200,
                'Search "Home Essentials"',
                1200,
              ]}
              speed={50}
              repeat={Infinity}
              wrapper="span"
            />
          </div>
        ) : (
          <input
            type="text"
            autoFocus
            defaultValue={searchText}
            onChange={handleOnChange}
            placeholder="Search for products, brands and more"
            className="w-full h-full bg-transparent outline-none text-gray-700 text-sm lg:text-base pr-4"
          />
        )}
      </div>
    </div>
  );
};

export default Search;
