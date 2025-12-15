import React, { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router";
import Container from "../../Utility/Container";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import SocialSign from "../../Components/SocialSign/SocialSign";
import { FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { GenerateTrackingId } from "../../Utility/GenerateTrackingId";

const Register = () => {
  const { signUp } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitForm = async (data) => {
    try {
      const { email, password, name: displayName } = data;
      const profileImg = data.photoURL[0];
      await signUp(email, password);

      const formData = new FormData();
      formData.append("image", profileImg);

      const img_API_URL_Key = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_img_API_URL_Key
      }`;

      const imgRes = await axios.post(img_API_URL_Key, formData);

      const photoURL = imgRes.data.data.url;

      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });

      const userInfo = {
        email,
        displayName,
        photoURL,
        trackingId: GenerateTrackingId(),
        createdAt: new Date(),
        role: "citizen",
        accountStatus: "active",
        planType: "free",
        isSubscribed: false,
      };

      const dbRes = await axiosSecure.post("/users", userInfo);

      if (dbRes.data.insertedId) {
        console.log("User created in the database");
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Created Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(location?.state || "/dashboard");
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

  return (
    <Container className="my-24 flex justify-center items-center">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-accent-content rounded-2xl p-6 hover:shadow-xl transition duration-300">
        <h1 className="text-center text-4xl font-bold text-primary mb-6">
          Welcome Back
        </h1>
        <p className="text-center text-accent mb-6">
          Login to continue to your account
        </p>

        <div className="card-body">
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
            <div>
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email Required!</p>
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

            <div className="relative">
              <label className="label font-semibold">Password</label>
              <input
                type={show ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 8,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                })}
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your password"
              />

              <span
                onClick={() => setShow(!show)}
                className="absolute top-[34px] right-6 cursor-pointer z-50 text-gray-500"
              >
                {show ? <IoEyeOff size={16} /> : <FaEye size={16} />}
              </span>

              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is Required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be 8 characters or longers
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password must contain at least one uppercase letter, one
                  lowercase letter, one number, and one special character.
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <a className="link link-hover text-sm text-primary">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn w-full bg-primary text-white font-bold text-md rounded-md shadow-md hover:bg-black transition-transform hover:scale-105"
            >
              Register
            </button>
          </form>

          <div className="divider text-gray-400">OR</div>

          {/* Google Login */}
          <SocialSign />

          <div className="text-center ">
            <p className="">
              Already have an account? Please{" "}
              <NavLink
                className="text-primary font-medium hover:underline"
                to={"/login"}
              >
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Register;
