import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import Container from "../../Utility/Container";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import { FaRocket, FaUserEdit, FaSignOutAlt, FaTimes, FaCheckCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";
import { uploadImg } from "../../Utility";
import { CheckCircle, CrownIcon, ShieldIcon } from "lucide-react";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const [showForm, setShowForm] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { user, userLogOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const { displayName, email, photoURL } = user || {};
  const name = displayName?.toUpperCase();

  const { data: myuser, isLoading, refetch } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: displayName,
    }
  });

  if (isLoading) {
    return <Loading />;
  }

  const { isSubscribed, _id } = myuser || {};

  const handleSubmitForm = async (data) => {
    setIsUpdating(true);
    try {
      const { name: newDisplayName } = data;
      let newPhotoURL = photoURL;

      if (data.photoURL && data.photoURL[0]) {
        newPhotoURL = await uploadImg(data.photoURL[0]);
      }

      const updateInfo = { displayName: newDisplayName, photoURL: newPhotoURL };
      await updateProfile(auth.currentUser, updateInfo);

      const res = await axiosSecure.patch(`/users/${user?.email}`, updateInfo);

      if (res.data.modifiedCount || res.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Profile updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
        setShowForm(false);
        reset();
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.message || "Something went wrong!",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    userLogOut()
      .then(() => {
        navigate("/login");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged out successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handlePayment = async () => {
    try {
      const boostInfo = {
        userId: _id,
        email,
        displayName,
        photoURL,
        isSubscribed: true,
        planType: "premium",
      };
      const res = await axiosSecure.post("/premium-checkout-session", boostInfo);
      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Payment initiation failed", error);
    }
  };

  return (
    <Container className="flex flex-col items-center justify-center bg-gray-50/50">
      <div className={`w-full transition-all duration-500 ease-in-out grid gap-8 items-start ${showForm ? "max-w-4xl md:grid-cols-12" : "max-w-md md:grid-cols-1"}`}>

        {/* Profile Card */}
        <div className={`w-full bg-white border border-gray-200 shadow-xl rounded-3xl p-8 transition-all duration-500 ${showForm ? "md:col-span-5" : "md:col-span-1"}`}>
          <div className="flex flex-col items-center text-center">

            {/* User Avatar with Premium Ring */}
            <div className="relative group">
              <div className={`w-28 h-28 rounded-full p-1 transition-transform duration-300 group-hover:scale-105 ${isSubscribed ? "bg-gradient-to-tr from-yellow-400 via-orange-500 to-indigo-600 shadow-md" : "bg-gray-200"}`}>
                <img
                  src={photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"}
                  alt="User Profile"
                  className="w-full h-full object-cover rounded-full bg-white p-0.5"
                />
              </div>
              {isSubscribed && (
                <span className="absolute bottom-1 right-1 bg-yellow-500 text-white p-1 rounded-full text-xs shadow-md border-2 border-white animate-pulse">
                  <CrownIcon />
                </span>
              )}
            </div>

            {/* Identity Text */}
            <div className="mt-6 space-y-1">
              <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
                {name || "ANONYMOUS USER"}
              </h1>
              <p className="text-sm font-medium text-gray-500 px-3 py-1 bg-gray-100 rounded-full inline-block">
                {email}
              </p>
            </div>

            {/* Premium Status Banner */}
            <div className="w-full my-6 p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between text-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Account Status</span>
              {isSubscribed ? (
                <span className="inline-flex items-center gap-1.5 font-semibold text-xs text-green-700 bg-green-50 px-2.5 py-1 rounded-md border border-green-200">
                  <FaCheckCircle /> Premium
                </span>
              ) : (
                <span className="inline-flex items-center font-medium text-xs text-gray-600 bg-gray-200/60 px-2.5 py-1 rounded-md">
                  Free Plan
                </span>
              )}
            </div>

            {/* Call To Actions */}
            <div className="flex flex-col gap-3 w-full">
              {!isSubscribed ? (
                <button
                  onClick={handlePayment}
                  className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 group"
                >
                  <FaRocket className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  Upgrade to Premium
                </button>
              ) : (
                <div className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-green-50 text-green-700 border border-green-200 flex items-center justify-center gap-2 cursor-not-allowed">
                  <FaCheckCircle /> VIP Access Activated
                </div>
              )}
            </div>

            {/* Profile Utilities */}
            <div className="grid grid-cols-2 gap-3 w-full mt-3">
              <button
                onClick={() => setShowForm(!showForm)}
                className={`py-2 px-3 rounded-xl font-medium text-xs border flex items-center justify-center gap-1.5 transition-colors duration-200 ${showForm ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"}`}
              >
                {showForm ? <FaTimes /> : <FaUserEdit />}
                {showForm ? "Close" : "Edit Profile"}
              </button>
              <button
                onClick={handleLogout}
                className="py-2 px-3 rounded-xl font-medium text-xs border border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 flex items-center justify-center gap-1.5 transition-colors duration-200"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>

          </div>
        </div>

        {/* Dynamic Update Form Panel */}
        {showForm && (
          <div className="w-full md:col-span-7 bg-white border border-gray-200 shadow-xl rounded-3xl p-8 transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
              <FaUserEdit className="text-indigo-600" /> Settings
            </h2>
            <p className="text-xs text-gray-500 mb-6">Modify your dynamic account information below.</p>

            <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Display Name</label>
                <input
                  type="text"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors ${errors.name ? "border-red-400 bg-red-50/30" : "border-gray-200"}`}
                  placeholder="Your Full Name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Upload Profile Avatar</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("photoURL")}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer border border-gray-200 p-1.5 rounded-xl"
                />
                <p className="text-gray-400 text-[11px] mt-1.5">Leave blank if you don't wish to change your avatar image.</p>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 py-2.5 px-4 rounded-xl font-semibold text-sm bg-indigo-600 text-white hover:bg-indigo-700 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isUpdating ? (
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    "Save Configurations"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); reset(); }}
                  className="py-2.5 px-4 rounded-xl font-semibold text-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </Container>
  );
};

export default Profile;
