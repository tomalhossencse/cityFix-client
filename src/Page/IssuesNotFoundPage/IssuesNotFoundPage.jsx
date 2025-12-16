import React from "react";
import { useNavigate } from "react-router";
import Container from "../../Utility/Container";

const IssuesNotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="flex flex-col justify-center items-center space-y-4 mt-26 p-4 md:p-0">
        <img
          className="p-6 md:h-[400px] h-[200px] "
          src="https://i.ibb.co.com/fcj6myR/App-Error.png"
        />
        <h1 className="md:text-4xl text-3xl text-primary font-bold">
          Oops, Issues not found!
        </h1>
        <p className="text-accent text-center">
          The issues you are requesting is not found on our system. please try
          another issues.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="btn px-6 bg-primary text-white font-bold text-md rounded-md shadow-md hover:bg-black transition-transform hover:scale-105"
        >
          Go Back
        </button>
      </div>
    </Container>
  );
};

export default IssuesNotFoundPage;
