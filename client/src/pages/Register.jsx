import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const valid = Object.values(data).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.register,
        data,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 -m-10">
      <div className="w-full max-w-sm sm:max-w-md bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6 sm:p-8">

        {/* HEADER */}
        <h2 className="text-2xl font-bold text-gray-800 mb-1 text-center">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Join us and start shopping
        </p>

        {/* FORM */}
        <form className="grid gap-4" onSubmit={handleSubmit}>

          {/* NAME */}
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="auth-input"
              onChange={handleChange}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="auth-input"
              onChange={handleChange}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="auth-password">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm text-gray-600">Confirm Password</label>
            <div className="auth-password">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={handleChange}
              />
              <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
          </div>

          {/* REGISTER BUTTON */}
          <button
            disabled={!valid}
            className={`w-full mt-2 py-2.5 rounded-lg font-semibold text-white transition
              ${valid
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90"
                : "bg-gray-400 cursor-not-allowed"}
            `}
          >
            Register
          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* GOOGLE */}
          <button
            type="button"
            className="social-btn border hover:bg-gray-50"
          >
            <FcGoogle size={20} /> Google Sign in
          </button>

          {/* FACEBOOK */}
          <button
            type="button"
            className="social-btn bg-blue-600 text-white hover:bg-blue-700"
          >
            <FaFacebookF /> Facebook Sign in
          </button>

          {/* FOOTER */}
          <p className="text-sm text-center text-gray-600 mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
