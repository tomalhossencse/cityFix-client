import React, { useContext, useRef, useState, useMemo } from "react";
import {
  Trash2Icon,
  CheckCircle2Icon,
  ClockIcon,
  UserIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  MapIcon,
  RocketIcon,
  ArrowLeftIcon,
  Edit3Icon,
  XCircleIcon,
  LockIcon,
  RefreshCwIcon,
  TagIcon,
  ThumbsUpIcon,
  AlertCircleIcon
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Container from "../../Utility/Container";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useNavigate, useParams } from "react-router";
import Loading from "../../Components/Loading/Loading";
import { DateFormat } from "../../Utility/FormateDate";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import IssueEdit from "../../Components/IssueEdit/IssueEdit";
import { CapitalizeFirstLetter } from "../../Utility/CapitalizeFirstLetter";
import toast from "react-hot-toast";

// Configured with background classes exactly matching your UI design palette
const STATUS_CONFIG = {
  pending: {
    colorClass: "bg-amber-100 text-amber-700 border border-amber-300",
    badgeClass: "bg-[#d48806] text-white", // Solid golden orange from your reference picture
    icon: <ClockIcon className="w-4 h-4" />,
    timelineIcon: <CheckCircle2Icon className="w-3.5 h-3.5" />
  },
  rejected: {
    colorClass: "bg-red-100 text-red-700 border border-red-300",
    badgeClass: "bg-[#f5222d] text-white", // Solid red from your reference picture
    icon: <XCircleIcon className="w-4 h-4" />,
    timelineIcon: <CheckCircle2Icon className="w-3.5 h-3.5" />
  },
  "in-progress": {
    colorClass: "bg-blue-100 text-blue-700 border border-blue-300",
    badgeClass: "bg-[#1890ff] text-white",
    icon: <RefreshCwIcon className="w-4 h-4 animate-spin" />,
    timelineIcon: <RefreshCwIcon className="w-3.5 h-3.5 animate-spin" />
  },
  working: {
    colorClass: "bg-pink-100 text-pink-700 border border-pink-300",
    badgeClass: "bg-[#eb2f96] text-white",
    icon: <RefreshCwIcon className="w-4 h-4" />,
    timelineIcon: <RefreshCwIcon className="w-3.5 h-3.5" />
  },
  resolved: {
    colorClass: "bg-green-100 text-green-700 border border-green-300",
    badgeClass: "bg-[#52c41a] text-white",
    icon: <CheckCircle2Icon className="w-4 h-4" />,
    timelineIcon: <CheckCircle2Icon className="w-3.5 h-3.5" />
  },
  closed: {
    colorClass: "bg-gray-100 text-gray-700 border border-gray-300",
    badgeClass: "bg-[#8c8c8c] text-white",
    icon: <LockIcon className="w-4 h-4" />,
    timelineIcon: <LockIcon className="w-3.5 h-3.5" />
  },
};

const IssueDetails = () => {
  const { user, loading } = useContext(AuthContext);
  const modelRef = useRef();
  const [editIssue, setEditIssue] = useState(null);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: issue,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["issues", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const { data: userDetails } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: upvotes = [], refetch: refetchUpvote } = useQuery({
    queryKey: ["upvotes", issue?._id],
    enabled: !!issue?._id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/upvotes/${issue?._id}`);
      return res.data;
    },
  });

  const isOwnIssue = useMemo(
    () => user?.email === issue?.email,
    [user?.email, issue?.email]
  );

  if (isLoading || loading) return <Loading />;

  const {
    issueTitle,
    createAt,
    photo,
    district,
    region: Region,
    priority,
    status,
    category,
    displayName,
    number,
    email,
    trackingId,
    _id,
    information,
    area,
  } = issue;

  const currentStatus = STATUS_CONFIG[status] || STATUS_CONFIG.pending;

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1b3022",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/issues/${_id}`).then((res) => {
          if (res.data.deletedCount) {
            navigate("/all-issues");
            Swal.fire({
              position: "top-right",
              title: "Deleted!",
              icon: "success",
              text: "Your Reported Issue has been deleted.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  const handlePayment = async () => {
    const { accountStatus } = userDetails || {};
    if (accountStatus === "blocked") {
      return toast.error("Your Account is Blocked By Admin");
    }
    const paymentInfo = {
      issueId: _id,
      email,
      photoURL: photo,
      issueTitle,
      trackingId,
      displayName: user?.displayName,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.href = res.data.url;
  };

  const handleUpvoteCount = async () => {
    if (!user) {
      toast.error("Please login to upvote this issue.");
      navigate("/login");
      return;
    }
    const { accountStatus } = userDetails || {};
    if (accountStatus === "blocked") {
      return toast.error("Your Account is Blocked By Admin");
    }
    if (isOwnIssue) {
      return toast.error("You can't upvote your own issue.");
    }

    const upvoteData = {
      issueId: issue._id,
      upvoterEmail: user.email,
      citzenEmail: issue.email,
      upvoteAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/upvotes", upvoteData);
      if (res.data.insertedId) {
        refetchUpvote();
        toast.success("Upvoted Successfully!");
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
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Action Bar */}
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-app-green-light hover:text-app-orange transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" /> Back to list
          </button>
          <span className="text-xs font-mono tracking-wider text-app-text-light bg-app-cream-dark px-3 py-1 rounded-md border border-app-border">
            ID: {trackingId || _id?.slice(-8).toUpperCase()}
          </span>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-app-border rounded-3xl p-6 md:p-8 shadow-sm">

          {/* Left Column (Image & Backing) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="relative aspect-video lg:aspect-square w-full bg-app-cream-dark rounded-2xl overflow-hidden group shadow-inner">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                src={photo || "https://images.unsplash.com/photo-1584467541268-b040f83be3fd"}
                alt={issueTitle}
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
                <AlertCircleIcon className={`w-3.5 h-3.5 ${priority === "normal" ? "text-app-green" : "text-app-error"}`} />
                <span className={`text-[10px] font-black uppercase tracking-wider ${priority === "normal" ? "text-app-green" : "text-app-error"}`}>
                  {priority} Priority
                </span>
              </div>
            </div>

            {/* Upvote Area */}
            <div className="bg-app-cream p-4 rounded-2xl border border-app-border flex items-center justify-between">
              <div>
                <h4 className="font-bold text-app-text text-sm">Community Support</h4>
                <p className="text-xs text-app-text-light">{upvotes.length} Citizens backed this</p>
              </div>
              <button
                disabled={isOwnIssue}
                onClick={handleUpvoteCount}
                className="inline-flex items-center gap-2 bg-app-orange text-white hover:bg-app-orange-dark disabled:bg-app-cream-dark disabled:text-app-text-light disabled:border-app-border disabled:cursor-not-allowed px-4 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <ThumbsUpIcon className="w-4 h-4" />
                <span>{upvotes.length} Upvotes</span>
              </button>
            </div>
          </div>

          {/* Right Column (Details) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">

              {/* Category & Status Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-app-cream border border-app-border text-app-green text-xs font-bold rounded-md">
                  <TagIcon className="w-3.5 h-3.5" />
                  {category}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-md ${currentStatus.colorClass}`}>
                  {currentStatus.icon}
                  {CapitalizeFirstLetter(status)}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-xl md:text-2xl font-semibold text-app-green tracking-tight leading-tight">
                {issueTitle}
              </h1>

              {/* Meta Metadata Bar */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-app-text-light pt-2 border-b border-app-border pb-4">
                <span className="inline-flex items-center gap-1.5">
                  <UserIcon className="w-4 h-4 text-app-green-lighter" />
                  <strong>{displayName}</strong>
                </span>
                <span className="text-app-border hidden sm:inline">|</span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPinIcon className="w-4 h-4 text-app-orange" />
                  {district}, {Region}
                </span>
                <span className="text-app-border hidden sm:inline">|</span>
                <span className="inline-flex items-center gap-1.5">
                  <ClockIcon className="w-4 h-4 text-app-green-lighter" />
                  {DateFormat(createAt)}
                </span>
              </div>

              {/* Information Grid Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2.5 p-3 bg-app-cream border border-app-border rounded-xl">
                  <div className="p-2 bg-white rounded-lg text-app-green shadow-sm">
                    <PhoneIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-app-text-light tracking-wider">Contact Phone</p>
                    <p className="font-semibold">{number}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 bg-app-cream border border-app-border rounded-xl">
                  <div className="p-2 bg-white rounded-lg text-app-error shadow-sm">
                    <MailIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-app-text-light tracking-wider">Citizen Email</p>
                    <p className="font-semibold truncate max-w-[180px]">{email}</p>
                  </div>
                </div>
              </div>

              {/* Map Area details */}
              <div className="flex items-start gap-2 p-3 bg-gray-50 border border-app-border rounded-xl text-sm">
                <MapIcon className="w-4 h-4 text-app-green-lighter mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-xs text-app-text-light uppercase tracking-wider block">Specific Area / Landmarks</span>
                  <span className="text-app-text font-medium">{area}</span>
                </div>
              </div>

              {/* Information Section */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-bold tracking-wider text-app-text-light">Report Description</label>
                <div className="bg-app-cream border border-app-border text-app-text text-sm leading-relaxed p-4 rounded-xl whitespace-pre-wrap">
                  {information}
                </div>
              </div>

            </div>

            {/* Action Utilities Block */}
            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-app-border w-full">
              {isOwnIssue && status === "pending" && (
                <button
                  onClick={() => setEditIssue(issue)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold border border-app-green text-app-green bg-white hover:bg-app-green hover:text-white rounded-xl transition-all"
                >
                  <Edit3Icon className="w-4 h-4" />
                  <span>Modify Details</span>
                </button>
              )}

              {isOwnIssue && (
                <>
                  <button
                    onClick={handleDelete}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold border border-app-error text-app-error bg-white hover:bg-app-error hover:text-white rounded-xl transition-all"
                  >
                    <Trash2Icon className="w-4 h-4" />
                    <span>Delete Issue</span>
                  </button>

                  {priority === "normal" && status !== "closed" && status !== "rejected" ? (
                    <button
                      onClick={handlePayment}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-app-green-light text-white hover:bg-app-green rounded-xl shadow-md transition-all active:scale-95 group"
                    >
                      <RocketIcon className="w-4 h-4 group-hover:animate-bounce" />
                      <span>Boost Visibility</span>
                    </button>
                  ) : priority === "high" ? (
                    <div className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold bg-app-success/10 text-app-success border border-app-success/30 rounded-xl cursor-default">
                      <CheckCircle2Icon className="w-4 h-4" />
                      <span>High Target Prioritized</span>
                    </div>
                  ) : null}
                </>
              )}
            </div>

          </div>
        </div>

        {/* Refactored Clean Reference Layout Timeline */}
        <div className="my-20 max-w-4xl mx-auto px-4">

          {/* Top Header Label directly referencing image layout style */}
          <div className="text-center mb-16">
            <div className="inline-block bg-[#42b883] text-white px-6 py-2 rounded-lg font-semibold text-sm tracking-wide shadow-sm">
              Timeline & Tracking
            </div>
          </div>

          {/* Master central vertical track wrapper */}
          <div className="relative">

            {/* Exact Central Line Track node line alignment anchor point */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#e8e8e8] -translate-x-1/2" />

            <div className="space-y-12 relative">
              {issue?.timeline?.slice().reverse().map((item, index) => {
                const stepConfig = STATUS_CONFIG[item?.status] || STATUS_CONFIG.pending;

                // Direct chronological switch mechanism (Even rows index left side, odd index right side)
                const isLeftSide = index % 2 === 0;

                return (
                  <div key={index} className="flex items-center justify-between w-full relative">

                    {/* Central Node Badge Position Indicator */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border border-app-border shadow-md ${stepConfig.badgeClass}`}>
                        {stepConfig.timelineIcon}
                      </div>
                    </div>

                    {/* Left Column Box Node Section */}
                    <div className="w-[calc(50%-24px)] flex flex-col justify-end items-end text-right">
                      {isLeftSide && (
                        <div className="w-full max-w-sm">
                          <time className="block text-[13px] font-sans font-semibold text-black mb-1">
                            {DateFormat(item?.createdAt)}
                          </time>
                          <div className={`inline-flex items-center gap-1.5 px-6 py-1.5 rounded-md font-bold text-sm tracking-wide ${stepConfig.badgeClass}`}>
                            {stepConfig.icon}
                            <span>{CapitalizeFirstLetter(item?.status)}</span>
                          </div>
                          <p className="text-[13px] text-[#262626] font-medium mt-1.5 px-1 leading-snug">
                            {item?.message}
                          </p>
                          <p className="text-[12px] text-black mt-1 px-1 font-medium">
                            Update By : <span className="font-bold text-black">{item?.updatedBy?.role || "citizen"}</span>
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Spacer bridging code layout segments width metrics blocks */}
                    <div className="w-12" />

                    {/* Right Column Box Node Section */}
                    <div className="w-[calc(50%-24px)] flex flex-col justify-start items-start text-left">
                      {!isLeftSide && (
                        <div className="w-full max-w-sm">
                          <time className="block text-[13px] font-sans font-semibold text-black mb-1">
                            {DateFormat(item?.createdAt)}
                          </time>
                          <div className={`inline-flex items-center gap-1.5 px-6 py-1.5 rounded-md font-bold text-sm tracking-wide ${stepConfig.badgeClass}`}>
                            {stepConfig.icon}
                            <span>{CapitalizeFirstLetter(item?.status)}</span>
                          </div>
                          <p className="text-[13px] text-[#262626] font-medium mt-1.5 px-1 leading-snug">
                            {item?.message}
                          </p>
                          <p className="text-[12px] text-black mt-1 px-1 font-medium">
                            Update By : <span className="font-bold text-black">{item?.updatedBy?.role || "citizen"}</span>
                          </p>
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div></div>


      <IssueEdit
        setEditIssue={setEditIssue}
        isLoading={isLoading}
        issue={editIssue}
        modelRef={modelRef}
        refetch={refetch}
      />
    </div>
  );
};

export default IssueDetails;
