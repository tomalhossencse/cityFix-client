import React, { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router";
import Container from "../../Utility/Container";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import SocialSign from "../../Components/SocialSign/SocialSign";
const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleFormSubmit = (data) => {
    const { email, password } = data;
    // console.log(data);
    signIn(email, password)
      .then(() => {
        navigate("/dashboard");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successfull!",
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
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
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

            <div className="relative">
              <label className="label font-semibold">Password</label>
              <input
                type={show ? "text" : "password"}
                className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary `}
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password Required!</p>
              )}
              <span
                onClick={() => setShow(!show)}
                className="absolute top-[34px] right-6 cursor-pointer z-50 text-gray-500"
              >
                {show ? <IoEyeOff size={16} /> : <FaEye size={16} />}
              </span>
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
              Login
            </button>
          </form>

          <div className="divider text-gray-400">OR</div>

          {/* Google Login */}
          <SocialSign />

          {/* Register Link */}
          <div className="text-center text-sm mt-6">
            <p>
              New to our website?{" "}
              <NavLink
                className="text-primary font-medium hover:underline"
                to={"/register"}
              >
                {" "}
                Create an account
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
