import React from "react";
import Container from "../../Utility/Container";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Loading from "../../Components/Loading/Loading";

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: issue, isLoading } = useQuery({
    queryKey: ["payment", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  const { issueTitle, email, trackingId, _id } = issue;

  const handlePayment = async () => {
    const paymentInfo = {
      issueId: _id,
      email,
      issueTitle,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };
  return (
    <Container className="mt-24">
      <h1>This is Payment Page.</h1>
      <p>Traking Id : {trackingId}</p>
      <button onClick={handlePayment} className="btn-small">
        Boost
      </button>
    </Container>
  );
};

export default Payment;
