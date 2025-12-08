import React from "react";
import Container from "../../Utility/Container";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <Container className="mt-24 px-4">
      <h1>Payment is Canceled</h1>
      <Link className="btn-small" to={`/all-issues`}>
        Please Try Again
      </Link>
    </Container>
  );
};

export default PaymentCancel;
