import React from "react";
import { FcHighPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";
import { FaPhoneVolume, FaRegCircleUser } from "react-icons/fa6";
import { MdMarkEmailRead } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { CiLocationOn } from "react-icons/ci";
import { FaMapMarkedAlt } from "react-icons/fa";
import Container from "../../Utility/Container";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import {
  MdOutlinePendingActions,
  MdOutlineTaskAlt,
  MdLockOutline,
} from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosTime, IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router";
import Loading from "../../Components/Loading/Loading";
import { DateFormat } from "../../Utility/FormateDate";
const IssueDetails = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: issue, isLoading } = useQuery({
    queryKey: ["issues", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${id}`);
      return res.data;
    },
  });
  console.log(issue);
  if (isLoading) return <Loading />;
  const {
    title,
    createAt,
    photo,
    district,
    region,
    priority,
    status,
    // updateCount,

    displayName,
    number,
    email,
    // _id,
    information,
    area,
  } = issue;

  const statusIcon = {
    pending: <MdOutlinePendingActions />,
    "in-progress": <AiOutlineLoading3Quarters />,
    resolved: <MdOutlineTaskAlt />,
    closed: <MdLockOutline />,
  };

  const statusColor = {
    pending: "text-yellow-600 bg-yellow-200",
    "in-progress": "text-blue-600 bg-blue-200",
    resolved: "text-green-600 bg-green-200",
    closed: "text-gray-500 bg-gray-200",
  };

  return (
    <Container className="md:min-h-screen md:mt-30 mt-8 md:p-6 p-4">
      <div
        className="md:flex justify-between gap-8 items-center bg-base-200 py-16 rounded-xl space-y-4 shadow-md   px-4          transform transition duration-300 ease-in-out 
            hover:scale-105  hover:-translate-y-1"
      >
        <div className="flex-2 md:pl-6 w-[300px]">
          <img className="rounded-xl w-full h-full object-cover" src={photo} />
        </div>
        <div className="flex-3 flex flex-col justify-center items-start px-2 space-y-4">
          <div className="flex gap-2 text-2xl md:text-3xl font-bold items-center justify-center text-primary">
            <span className="">{title}</span>
          </div>
          {/* contact */}
          <div className="md:flex gap-4">
            <div className="bg-primary text-base-100 px-4 py-2 rounded-md my-2 flex gap-2 items-center">
              <div>
                <FaPhoneVolume />
              </div>
              <span>{number}</span>
            </div>
            <div className="bg-secondary-content text-black px-4 py-2 rounded-md my-2 flex gap-2 items-center">
              <div>
                <MdMarkEmailRead size={20} />
              </div>
              <span>{email}</span>
            </div>
          </div>
          <div className="md:flex">
            {/* area */}
            <div className="flex items-center gap-2 text-lg text-accent md:px-2 py-4 rounded-md ">
              <FaMapMarkedAlt size={20} />
              <span>{area}</span>
            </div>
            {/* Added time */}
            <div className="rounded-md flex gap-2 items-center">
              <div className="text-primary">
                <IoIosTime size={24} />
              </div>
              <p>{DateFormat(createAt)}</p>
            </div>
          </div>

          {/* contributer email */}
          <div className="md:px-2 md:py-2 rounded-md flex gap-2 items-center">
            <div className="text-primary">
              <FaRegCircleUser size={20} />
            </div>
            <p>
              <span className="font-bold text-primary">User Name :</span>{" "}
              {displayName}
            </p>
          </div>

          {/* information */}
          <div className="bg-accent text-base-100 w-full md:w-4/5 px-4 py-4 rounded-md">
            {information}
          </div>
          <div className="flex flex-wrap gap-6 items-center justify-center text-accent">
            <div
              className={`flex gap-2  items-center justify-center ${
                priority === "normal" ? "text-primary" : "text-red-500"
              }`}
            >
              <span>
                {priority === "normal" ? (
                  <FcLowPriority size={20} />
                ) : (
                  <FcHighPriority size={20} />
                )}
              </span>
              <span className={`font-bold`}>{priority.toUpperCase()}</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <span>
                <CiLocationOn />
              </span>
              <span>
                {district}, {region}
              </span>
            </div>
            <div
              className={`flex items-center text-md font-bold justify-center gap-2 px-2 rounded-xl ${statusColor[status]}`}
            >
              <span>{statusIcon[status]}</span>
              <span>{status.toUpperCase()} </span>
            </div>

            <button onClick={() => navigate(-1)} className="btn-small">
              <span>
                <IoMdArrowRoundBack size={18} />
              </span>
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default IssueDetails;
