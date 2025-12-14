import React, { useContext } from "react";
import { MdHowToVote } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { HiCalendarDateRange } from "react-icons/hi2";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { DateFormat } from "../../Utility/FormateDate";
import { AuthContext } from "../../Context/AuthContext";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
const IssueCard = ({ issue }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    issueTitle,
    createAt,
    photo,
    district,
    region,
    priority,
    status,
    _id,
  } = issue;

  const { data: upvotes = [], refetch } = useQuery({
    queryKey: ["upvotes", issue._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/upvotes/${issue._id}`);
      return res.data;
    },
  });
  // console.log(upvotes);

  const handleUpvoteCount = async (issue) => {
    const upvoteData = {
      issueId: issue?._id,
      upvoterEmail: user?.email,
      citzenEmail: issue?.email,
      upvoteAt: new Date(),
    };
    if (!user) {
      navigate("/login");
    }

    if (upvoteData.citzenEmail === upvoteData.upvoterEmail) {
      toast.error("You can’t upvote your own issue.");
      return;
    }

    const res = await axiosSecure.post("/upvotes", upvoteData);
    if (res.data.insertedId) {
      refetch();
      toast.success("Upvote Successfully!");
    }
  };
  return (
    <div
      className="flex flex-col justify-between bg-base-200 p-6 rounded-xl space-y-4 shadow-md 
            transform transition duration-600 ease-in-out 
            hover:scale-105 hover:bg-base-100 hover:-translate-y-1"
    >
      <ul className="flex justify-between text-accent">
        <li className="flex items-center justify-center gap-1">
          <span className="text-primary"></span>
          <span
            className={`rounded-4xl bg-primary px-2 text-base-100 ${
              priority === "normal" ? "bg-primary" : "bg-red-500"
            }`}
          >
            {priority.toUpperCase()}
          </span>
        </li>
        <li className="flex items-center justify-center gap-1">
          <span>
            <CiLocationOn />
          </span>
          <span>
            {district}, {region}
          </span>
        </li>
      </ul>
      <div className="w-full h-[250px]">
        <img className="rounded-xl w-full h-full object-cover" src={photo} />
      </div>
      <div className="px-2 space-y-4">
        {/* issueTitle */}
        <div className="text-xl font-bold text-primary">{issueTitle}</div>

        {/* create time*/}
        <div className="flex justify-between items-center">
          <div className="rounded-md text-accent flex gap-2 py-1 items-center">
            <div>
              <IoTime size={24} />
            </div>
            <p>{DateFormat(createAt)}</p>
          </div>

          <li className="flex items-center justify-center gap-1">
            <span>
              <HiCalendarDateRange />
            </span>
            <span>{status.toUpperCase()}</span>
          </li>
        </div>
        <ul className="flex justify-between text-accent">
          <Link
            to={`/all-issues/${_id}`}
            className="flex items-center justify-center gap-4 text-accent text-md rounded-md transition-transform hover:scale-105 hover:text-primary"
          >
            <span>See Details</span>
            <FaArrowRightLong size={15} />
          </Link>
          <button
            disabled={user?.email === issue?.email}
            onClick={() => handleUpvoteCount(issue)}
            className="btn-outline flex items-center justify-center"
          >
            <span>
              <MdHowToVote size={24} />
            </span>
            <span className="text-[24px] font-bold">({upvotes?.length})</span>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default IssueCard;
