import React from "react";
import { useNavigate } from "react-router";
import Container from "../../Utility/Container";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <div className="flex flex-col justify-center items-center p-4 space-y-4 my-14">
          <img
            className="p-6 md:h-[400px] h-[250px]"
            src="https://i.ibb.co.com/Gv9McZnF/Asset-1.png"
            alt=""
          />
          <h1 className="md:text-4xl text-3xl text-primary font-bold">
            Oops, page not found!
          </h1>
          <p className="text-accent">
            The page you are looking for is not available.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="btn px-6 bg-primary text-white font-bold text-md rounded-md shadow-md hover:bg-black transition-transform hover:scale-105"
          >
            Go Back
          </button>
        </div>
      </Container>
    </div>
  );
};

export default ErrorPage;
