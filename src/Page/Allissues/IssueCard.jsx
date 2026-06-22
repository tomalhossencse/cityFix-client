import React, { useContext, useMemo } from "react";
import {
  MdCancel,
  MdHowToVote,
  MdLockOutline,
  MdOutlinePendingActions,
  MdOutlineTaskAlt,
} from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowRightLong, FaPersonRunning } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { DateFormat } from "../../Utility/FormateDate";
import { CapitalizeFirstLetter } from "../../Utility/CapitalizeFirstLetter";
import { AuthContext } from "../../Context/AuthContext";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { ClockIcon, MapPinIcon, ThumbsUp, Timer } from "lucide-react";

const STATUS_CONFIG = {
  pending: {
    color: "from-yellow-500  to-orange-500",
    bgGlow: "shadow-yellow-500/50",
    icon: <MdOutlinePendingActions size={16} />,
  },
  rejected: {
    color: "from-red-500  to-pink-600",
    bgGlow: "shadow-red-500/50",
    icon: <MdCancel size={16} />,
  },
  "in-progress": {
    color: "from-blue-500  to-cyan-500",
    bgGlow: "shadow-blue-500/50",
    icon: <MdCancel size={16} />,
  },
  working: {
    color: "from-pink-500  to-purple-600",
    bgGlow: "shadow-pink-500/50",
    icon: <FaPersonRunning size={16} />,
  },
  resolved: {
    color: "from-green-500  to-emerald-600",
    bgGlow: "shadow-green-500/50",
    icon: <MdOutlineTaskAlt size={16} />,
  },
  closed: {
    color: "from-gray-500  to-slate-600",
    bgGlow: "shadow-gray-500/50",
    icon: <MdLockOutline size={16} />,
  },
};

const StatusConfig = STATUS_CONFIG[status] || STATUS_CONFIG.pending;


const IssueCard = ({ issue }) => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    issueTitle,
    createAt,
    photo,
    district,
    priority,
    status,
    _id,
    category,
    email: issueOwnerEmail,
  } = issue;

  const isOwnIssue = useMemo(
    () => user?.email === issueOwnerEmail,
    [user?.email, issueOwnerEmail],
  );

  const StatusConfig = STATUS_CONFIG[status] || STATUS_CONFIG.pending;

  const { data: upvotes = [], refetch } = useQuery({
    queryKey: ["upvotes", _id],
    enabled: !!_id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/upvotes/${_id}`);
      return res.data;
    },
  });

  const { data: userDetails } = useQuery({
    queryKey: ["users", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const handleUpvoteCount = async (issue) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (userDetails?.accountStatus === "blocked") {
      toast.error("Your account is blocked by admin");
      return;
    }

    if (isOwnIssue) {
      return toast.error("You can't upvote your own issue");
    }

    const upvoteData = {
      issueId: issue._id,
      citzenEmail: user.email,
      upvoteAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/upvotes", upvoteData);

      if (res.data?.insertedId) {
        await refetch();
        toast.success("Upvoted successfully!");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("You already upvoted this issue");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div onClick={() => navigate(`/all-issues/${_id}`)} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition-all duration-300 group animate-fade-in cursor-pointer">

      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={photo}
          className="w-full h-full object-cover  group-hover:scale-[1.07] transition-all duration-300"
        />

        {/* Priority */}
        <span
          className={`absolute top-3 left-3 px-2 py-0.5  rounded-full text-xs  text-white uppercase ${priority === "high"
            ? "bg-red-500"
            : "bg-app-orange"
            }`}
        >
          {priority}
        </span>

        {/* Status */}
        <div
          className={`absolute top-3 right-3 flex items-center gap-1 px-1 py-1 rounded-full bg-linear-to-r uppercase ${StatusConfig.color} text-white text-xs`}
        >
          {StatusConfig.icon}

        </div>
      </div>

      {/* issue info */}
      <div className="p-3.5 text-zinc-700">

        <h3 className="text-sm font-medium leading-snug mb-2 line-clamp-1 ">
          {issueTitle}
        </h3>


        <div className="flex items-center gap-1 mb-4">
          <ClockIcon className="size-3 text-app-warning" />
          <span className="text-xs font-medium text-app-text line-clamp-1">{DateFormat(createAt)}</span>
        </div>


        <div className="flex justify-between items-center mb-4 truncate">
          <div className="inline-block bg-app-cream px-2 py-1 rounded-full text-xs font-medium text-app-orange">
            {category}
          </div>
          <div className="inline-block bg-app-cream px-2 py-1 rounded-full text-xs font-medium text-orange-500">
            {upvotes.length}
          </div>
        </div>




        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <MapPinIcon className="size-4 text-app-warning" />
            <span className="text-sm font-medium text-app-text">{district}</span>
          </div>



          <button
            onClick={(e) => {
              e.stopPropagation();
              handleUpvoteCount(issue);
            }}
            disabled={isOwnIssue}
            className="size-7 rounded-full  bg-app-orange text-white flex-center shrink-0 hover:bg-app-orange-dark transition-colors active:scale-95"
          >
            <ThumbsUp className="size-3.5" />

          </button>

        </div>

      </div>

    </div>
  );
};

export default IssueCard;
