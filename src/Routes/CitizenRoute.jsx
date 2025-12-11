import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import useRole from "../Hook/useRole";
import Loading from "../Components/Loading/Loading";
import { useNavigate } from "react-router";

const CitizenRoute = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const { role, loading: roleLoading } = useRole();
  const navigate = useNavigate();
  if (loading || roleLoading) {
    return <Loading />;
  }

  if (role !== "citizen") {
    return (
      <div>
        <div className="min-h-[80vh] flex flex-col justify-center items-center gap-10">
          <div className="text-red-500 text-3xl font-bold">
            You are not allowed to access to this page.
          </div>
          <button className="btn-primary" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default CitizenRoute;
