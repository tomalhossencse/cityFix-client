import React, { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router";
import Container from "../../Utility/Container";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import SocialSign from "../../Components/SocialSign/SocialSign";
import { footerData, heroSectionData } from "../../assets/assets";
import {
  Building2Icon,
  Eye,
  EyeOff,
  Loader2Icon,
  LockIcon,
  MailIcon,
  User,
  UserCircle,
  UserCircle2,
  UserCircle2Icon,
  UserIcon,
} from "lucide-react";
import { updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";
import { uploadImg } from "../../Utility";
import { GenerateTrackingId } from "../../Utility/GenerateTrackingId";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const axiosSecure = useAxiosSecure();

  const { signIn, signUp } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (data) => {
    if (isLogin) {
      try {
        setLoading(true);
        const { email, password } = data;
        await signIn(email, password)
        navigate("/dashboard")
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successfull!",
          showConfirmButton: false,
          timer: 1500,
        })
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      finally {
        setLoading(false)
      }
      return;
    }
    // registration

    try {
      setLoading(true)
      const { email, password, name: displayName } = data;
      const profileImg = data.photoURL[0];
      await signUp(email, password);

      const photoURL = await uploadImg(profileImg);

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
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <div className="min-h-screen flex">
        {/* left side */}
        <div className="hidden lg:flex lg:w-1/2 bg-app-green relative items-center justify-center">
          <img
            src={heroSectionData.hero_image_1}
            alt="hero"
            className="absolute inset-0 object-cover h-full bg-center opacity-20"
          />
          <div className="text-center px-12">
            <h1 className="text-4xl font-semibold text-white mb-4">
              Welcome Back to City Fix
            </h1>
            <p className="text-white/60 font-serif text-xl max-w-sm mx-auto">
              Post your city problems here and reslove with
              community helps
            </p>
          </div>
        </div>
        {/* right side */}
        <div className="flex-1 flex-center px-4 py-12 bg-app-cream">
          <div className="w-full max-w-md">
            {/*form header message */}
            <div className="text-center mb-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 mb-6"
              >
                <Building2Icon className="size-8 text-app-orange" />
                <span className="text-2xl font-semibold text-app-green">
                  {footerData.brand.name}
                </span>
              </Link>

              <h1 className="text-2xl font-semibold text-app-green mb-2">
                {isLogin
                  ? "Sign in your account"
                  : "Sign up for an account"}
              </h1>

              <p className="text-sm text-app-text-light">
                {isLogin
                  ? "Don't have an account"
                  : "Already have an account"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-orange-500 ml-1 font-semibold hover:text-orange-600 transition-colors "
                >
                  {isLogin ? "Create one" : "Sign in"}
                </button>
              </p>
            </div>

            {/*login / register form  */}
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
              {!isLogin && (
                // name
                <label className="text-sm flex flex-col gap-1">
                  Name
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border  not-focus:border-app-border transition-all"
                      placeholder="Your name"
                      {...register("name", {
                        required: true,
                      })}
                    />

                  </div> {errors.name?.type === "required" && (
                    <p className="text-red-500">
                      Name Required!
                    </p>
                  )}
                </label>
              )}
              {/*  email*/}
              <label className="text-sm flex flex-col gap-1">
                Email Address
                <div className="relative">
                  <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                  <input
                    type="email"
                    className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border  not-focus:border-app-border transition-all"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: true,
                    })}
                  />

                </div>
                {errors.email?.type === "required" && (
                  <p className="text-red-500">
                    Email Required!
                  </p>
                )}
              </label>

              {/* photo */}
              {!isLogin &&
                <label className="text-sm flex flex-col gap-1">Photo
                  <div className="flex items-center gap-4">

                    {
                      imageFile && (
                        <div className="size-16 rounded-lg border border-zinc-200 overflow-hidden shrink-0 bg-app-cream">
                          <img src={URL.createObjectURL(imageFile)} className="w-full h-full object-cover" alt="preview" />
                        </div>
                      )
                    }

                    <div className="relative w-full">
                      <input
                        type="file"
                        accept="image/*"
                        {...register("photoURL", { required: true })}
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        className="w-full pl-11  pr-4 py-3 rounded-xl text-sm bg-white border border-zinc-200 focus:border-app-green outline-none transition-all file:mr-4 file:py-2  file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-app-orange file:text-white hover:file:bg-orange-600 cursor-pointer"
                      />
                      <UserCircle2Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                    </div>

                  </div>
                  {errors.photoURL?.type === "required" && (
                    <p className="text-sm text-red-500 ">Image is Required</p>
                  )}
                </label>

              }

              {/* password */}
              <label className="text-sm flex flex-col gap-1">
                Password
                <div className="relative">
                  <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                  <input
                    type={show ? "text" : "password"}
                    className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border  not-focus:border-app-border transition-all"
                    placeholder="•••••••••"
                    {...register("password", {
                      required: true,
                    })}
                  />

                  <button type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-app-text-light cursor-pointer"
                  >
                    {show ? (
                      <Eye className="size-4" />
                    ) : (
                      <EyeOff className="size-4" />
                    )}
                  </button>
                </div>
                {errors.password?.type === "required" && (
                  <p className="text-red-500">
                    Password Required!
                  </p>
                )}
              </label>

              {/* submit buttons */}
              <button type="submit" className="flex-center w-full py-3 bg-green-950 text-white font-semibold  rounded-xl hover:bg-green-900 transition-colors disabled:opacity-50 active:scale-95" disabled={loading}>
                {
                  loading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : isLogin ? "Sign In" : "Sign Up"
                }
              </button>

              <div className=" flex-center gap-4 px-2 text-app-text-light">
                <div className="w-full h-0.5 bg-app-orange" />  <span className="text-xs">OR</span> <div className="w-full h-0.5 bg-app-orange" />
              </div>

              {/* Google Login */}
              <SocialSign />


            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
