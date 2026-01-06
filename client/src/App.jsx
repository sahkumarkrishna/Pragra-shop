import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";



import Header from "./components/Header";
import Footer from "./components/Footer";
import CartMobileLink from "./components/CartMobile";

import GlobalProvider from "./provider/GlobalProvider";

import fetchUserDetails from "./utils/fetchUserDetails";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";

import { setUserDetails } from "./store/userSlice";
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from "./store/productSlice";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  /* =======================
     FETCH USER
  ======================== */
  const fetchUser = useCallback(async () => {
    try {
      const userData = await fetchUserDetails();
      dispatch(setUserDetails(userData?.data || {}));
    } catch (error) {
      console.error("Failed to fetch user");
    }
  }, [dispatch]);

  /* =======================
     FETCH CATEGORY
  ======================== */
  const fetchCategory = useCallback(async () => {
    try {
      dispatch(setLoadingCategory(true));

      const response = await Axios({
        ...SummaryApi.getCategory,
      });

      if (response.data.success) {
        dispatch(
          setAllCategory(
            response.data.data.sort((a, b) =>
              a.name.localeCompare(b.name)
            )
          )
        );
      }
    } catch (error) {
      console.error("Failed to fetch category");
    } finally {
      dispatch(setLoadingCategory(false));
    }
  }, [dispatch]);

  /* =======================
     FETCH SUB CATEGORY
  ======================== */
  const fetchSubCategory = useCallback(async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });

      if (response.data.success) {
        dispatch(
          setAllSubCategory(
            response.data.data.sort((a, b) =>
              a.name.localeCompare(b.name)
            )
          )
        );
      }
    } catch (error) {
      console.error("Failed to fetch sub category");
    }
  }, [dispatch]);

  /* =======================
     INITIAL LOAD
  ======================== */
  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
  }, [fetchUser, fetchCategory, fetchSubCategory]);

  return (
    <GlobalProvider>
      <Header />

      <main className="min-h-[78vh] pb-20 lg:pb-0">
        <Outlet />
      </main>

      <Footer />
      <Toaster position="top-center" />

      {/* MOBILE CART BUTTON */}
      {location.pathname !== "/checkout" && <CartMobileLink />}
    </GlobalProvider>
  );
}

export default App;
