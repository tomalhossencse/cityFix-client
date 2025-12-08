import React from "react";
import { GrUpdate } from "react-icons/gr";
import { MdBloodtype, MdHowToVote } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { HiCalendarDateRange } from "react-icons/hi2";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoShareSocialSharp, IoTime } from "react-icons/io5";
import { Link } from "react-router";
import { DateFormat } from "../../Utility/FormateDate";
const IssueCard = ({ issue }) => {
  const {
    issueTitle,
    createAt,
    photo,
    district,
    region,
    priority,
    status,
    upvoteCount,
    _id,
  } = issue;
  return (
    <div
      className="flex flex-col justify-between bg-base-200 p-6 rounded-xl space-y-4 shadow-md 
            transform transition duration-600 ease-in-out 
            hover:scale-105 hover:bg-secondary-content hover:-translate-y-1"
    >
      <ul className="flex justify-between text-accent">
        <li className="flex items-center justify-center gap-1">
          <span className="text-primary">
            {/* <MdBloodtype size={24} /> */}
          </span>
          <span className="rounded-4xl bg-primary px-2 text-base-100">
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
          <button className="btn-small flex items-center justify-center gap-1">
            <span>
              <MdHowToVote size={16} />
            </span>
            <span>Upvote : ({upvoteCount})</span>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default IssueCard;
