import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { updatedAvatar } from "../store/userSlice";
import { IoClose } from "react-icons/io5";

const UserProfileAvatarEdit = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];
    if (!file || loading) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData,
      });

      if (response.data.success) {
        dispatch(updatedAvatar(response.data.data.avatar));
        close?.();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-6 relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={close}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <IoClose size={22} />
        </button>

        {/* AVATAR */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border bg-gray-100 flex items-center justify-center shadow">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaRegUserCircle size={80} className="text-gray-400" />
            )}
          </div>

          {/* UPLOAD BUTTON */}
          <label htmlFor="uploadProfile">
            <div
              className={`px-5 py-2 rounded text-sm font-medium cursor-pointer transition
              ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "border border-primary-200 text-primary-200 hover:bg-primary-200 hover:text-white"
              }`}
            >
              {loading ? "Uploading..." : "Upload Avatar"}
            </div>
            <input
              type="file"
              id="uploadProfile"
              className="hidden"
              accept="image/*"
              onChange={handleUploadAvatarImage}
              disabled={loading}
            />
          </label>
        </div>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
