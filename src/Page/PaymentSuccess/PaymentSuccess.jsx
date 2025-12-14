import React, { useEffect } from "react";
import Container from "../../Utility/Container";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const [searchparams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchparams.get("session_id");
  // console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.modifyStatus.modifiedCount) {
            toast.success("Payment SuccesFully");
          }
        });
    }
  }, [sessionId, axiosSecure]);
  return (
    <Container className="flex flex-col items-center justify-center mt-24 mb-10 mx-12 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 border border-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-primary/50 ring-offset-2">
              <img
                // src={photoURL}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary">{name}</h1>
            {/* <p className="text-accent mt-1">{email}</p> */}
          </div>

          <div className="flex gap-3">
            <button
              // onClick={handleLogout}
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

export default PaymentSuccess;
{
  /* <Container className="mt-24 px-4">
      <h1>Payment is Successfull</h1>
    </Container> */
}
