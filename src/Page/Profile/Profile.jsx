import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import { Link, NavLink, useNavigate } from "react-router";
import Container from "../../Utility/Container";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import { FaEye, FaRocket } from "react-icons/fa";
import { MdOutlineDownloadDone } from "react-icons/md";
import { useForm } from "react-hook-form";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";
import { IoEyeOff } from "react-icons/io5";
import SocialSign from "../../Components/SocialSign/SocialSign";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const [show, setShow] = useState(false);
  const { user, userLogOut } = useContext(AuthContext);
  // console.log(user);
  const navigate = useNavigate();
  const { displayName, email, photoURL } = user;
  const name = displayName?.toUpperCase();
  const { data: myuser, isLoading } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${email}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitForm = async (data) => {
    try {
      const { name: displayName } = data;
      const profileImg = data.photoURL[0];

      const formData = new FormData();
      formData.append("image", profileImg);

      const img_API_URL_Key = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_img_API_URL_Key
      }`;

      const imgRes = await axios.post(img_API_URL_Key, formData);

      const photoURL = imgRes.data.data.url;
      const updateInfo = { displayName, photoURL };
      await updateProfile(auth.currentUser, updateInfo);

      const res = await axiosSecure.patch(`/users/${user?.email}`, updateInfo);
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Created Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setShow(!show);
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.message || "Something went wrong!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  if (isLoading) {
    return <Loading />;
  }

  const { isSubscribed, _id } = myuser;

  const handleLogout = () => {
    userLogOut()
      .then(() => {
        navigate("/login");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout Successfull!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handlePayment = async () => {
    const boostInfo = {
      userId: _id,
      email,
      displayName,
      photoURL,
      isSubscribed: true,
      planType: "premium",
    };
    const res = await axiosSecure.post("/premium-checkout-session", boostInfo);
    // console.log(res.data);
    window.location.href = res.data.url;
  };

  return (
    <Container className="flex flex-col items-center justify-center mt-24 mb-20 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-12 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 border border-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-primary/50 ring-offset-2">
              <img
                src={photoURL}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {isSubscribed && (
              <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary">{name}</h1>
            <p className="text-accent mt-1">{email}</p>
          </div>

          <div className="flex gap-3">
            {/* <button className="btn btn-primary btn-sm px-5">Boost Now</button> */}
            {!isSubscribed ? (
              <div onClick={handlePayment} className="btn-small-red px-5">
                <FaRocket />

                <span>Subscribe</span>
              </div>
            ) : (
              <div disabled className="btn-small-blue">
                <MdOutlineDownloadDone size={20} />
                <span>Subscribed</span>
              </div>
            )}
            <button onClick={() => setShow(!show)} className="btn-small">
              Update Profile
            </button>
            <button onClick={handleLogout} className="btn-small-red">
              Logout
            </button>
          </div>
        </div>
      </div>{" "}
      <div
        className={` ${
          !show && "hidden"
        } card w-full max-w-md bg-base-100 shadow-2xl rounded-2xl p-12 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 border border-gray-100 mt-20`}
      >
        <h1 className="text-center text-3xl font-bold text-primary mb-4">
          Update Your Profile
        </h1>

        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
          {/* name */}
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Name"
              {...register("name", { required: true })}
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name Required!</p>
            )}
          </div>

          {/* photo */}
          <div>
            <label className="label font-semibold">Photo</label>
            <input
              type="file"
              {...register("photoURL", { required: true })}
              className="file-input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.photoURL?.type === "required" && (
              <p className="text-red-500">Profile Photo is Required</p>
            )}
          </div>

          <div className="flex gap-4 py-2">
            <button
              type="submit"
              className="btn flex-1  bg-primary text-white font-bold text-md rounded-md shadow-md hover:bg-black transition-transform hover:scale-105"
            >
              Update
            </button>
            <button
              onClick={() => setShow(!show)}
              className="btn flex-1  bg-red-500 text-white font-bold text-md rounded-md shadow-md hover:bg-black transition-transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Profile;
