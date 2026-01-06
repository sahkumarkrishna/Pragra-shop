import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { setUserDetails } from "../store/userSlice";
import fetchUserDetails from "../utils/fetchUserDetails";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    name: user.name || "",
    email: user.email || "",
    mobile: user.mobile || "",
  });

  useEffect(() => {
    setUserData({
      name: user.name || "",
      email: user.email || "",
      mobile: user.mobile || "",
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        const updatedUser = await fetchUserDetails();
        dispatch(setUserDetails(updatedUser.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-slate-50 min-h-screen p-4 flex justify-center">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow p-6">

        {/* PROFILE HEADER */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-24 h-24 rounded-full overflow-hidden shadow">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-200">
                <FaRegUserCircle size={70} className="text-slate-500" />
              </div>
            )}
          </div>

          <button
            onClick={() => setProfileAvatarEdit(true)}
            className="mt-3 text-sm px-4 py-1 rounded-full border hover:bg-blue-100"
          >
            Change Avatar
          </button>
        </div>

        {/* AVATAR MODAL */}
        {openProfileAvatarEdit && (
          <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
        )}

        {/* PROFILE FORM */}
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">

          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleOnChange}
              className="w-full mt-1 p-2 rounded-lg border bg-slate-50 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleOnChange}
              className="w-full mt-1 p-2 rounded-lg border bg-slate-50 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={userData.mobile}
              onChange={handleOnChange}
              className="w-full mt-1 p-2 rounded-lg border bg-slate-50 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Profile;
