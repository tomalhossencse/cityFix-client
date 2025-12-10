import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import Container from "../../Utility/Container";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import { FaRocket } from "react-icons/fa";
import { MdOutlineDownloadDone } from "react-icons/md";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, userLogOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const { displayName, email, photoURL } = user;
  const name = displayName?.toUpperCase();
  const { data: myuser, isLoading } = useQuery({
    queryKey: ["/users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${email}`);
      return res.data;
    },
  });
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
      isSubscribed: true,
      planType: "premium",
    };
    const res = await axiosSecure.post("/premium-checkout-session", boostInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  return (
    <Container className="flex flex-col items-center justify-center mt-24 mb-10 mx-12 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 border border-gray-100">
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
              <div onClick={handlePayment} className="btn-yellow px-5">
                <FaRocket />

                <span>Boost</span>
              </div>
            ) : (
              <div disabled className="btn btn-primary btn-sm px-5">
                <MdOutlineDownloadDone size={20} />
                <span>Boosted</span>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-sm px-5"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
