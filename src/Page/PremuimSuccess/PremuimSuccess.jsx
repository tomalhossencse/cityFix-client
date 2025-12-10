import React, { useEffect } from "react";
import Container from "../../Utility/Container";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const PremuimSuccess = () => {
  const [searchparams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchparams.get("session_id");
  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/premuim-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
        });
    }
  }, [sessionId, axiosSecure]);
  return (
    <Container className="mt-24 px-4">
      <h1 className="text-xl text-primary">
        User Update to Premuim SuccesFully
      </h1>
    </Container>
  );
};

export default PremuimSuccess;
