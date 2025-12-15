import React, { useEffect, useRef, useState } from "react";
import Container from "../../Utility/Container";
import { useNavigate, useSearchParams } from "react-router";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchparams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchparams.get("session_id");
  const calledRef = useRef(false);
  const [paymentInfo, setPaymentInfo] = useState({});

  useEffect(() => {
    if (!sessionId || calledRef.current) {
      return;
    }
    calledRef.current = true;
    axiosSecure
      .patch(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        console.log(res.data);
        toast.success("Payment SuccesFully");
        setPaymentInfo({
          trackingId: res.data.trackingId,
          transactionId: res.data.transactionId,
          custormer_photo: res.data.payment.custormer_photo,
          issueTitle: res.data.payment.issueTitle,
        });
      });
  }, [sessionId, axiosSecure]);
  console.log(paymentInfo);

  return (
    <Container className="flex flex-col items-center justify-center mt-24 mb-10 mx-12 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 border border-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-primary text-2xl font-bold">
            Payment Succesfull
          </h1>
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-primary/50 ring-offset-2">
              <img
                src={paymentInfo?.custormer_photo}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary">
              {paymentInfo?.issueTitle}
            </h1>
            <p className="text-accent mt-1">
              <span className="font-bold"> Tnxid :</span>{" "}
              {paymentInfo?.transactionId}
            </p>
            <p className="text-accent mt-1">
              <span className="font-bold">Tracking Id :</span>{" "}
              {paymentInfo?.trackingId}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/dashboard/my-issues")}
              className="btn-primary"
            >
              Back
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
