import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import Container from "../../Utility/Container";
const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
          <form className="space-y-4">
            <div>
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your email"
                name="email"
                required
              />
            </div>

            <div className="relative">
              <label className="label font-semibold">Password</label>
              <input
                type={show ? "text" : "password"}
                className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary `}
                placeholder="Enter your password"
                name="password"
                required
              />
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
          <button className="btn bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 w-full flex items-center justify-center gap-2">
            <svg
              aria-label="Google logo"
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>

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
