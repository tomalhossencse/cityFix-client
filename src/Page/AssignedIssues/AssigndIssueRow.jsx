import React from "react";
import { DateFormat } from "../../Utility/FormateDate";
import {
  MdCancel,
  MdLockOutline,
  MdOutlinePendingActions,
  MdOutlineTaskAlt,
} from "react-icons/md";
import { CapitalizeFirstLetter } from "../../Utility/CapitalizeFirstLetter";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GrUserWorker } from "react-icons/gr";
import { FaPersonRunning } from "react-icons/fa6";
import { FcHighPriority, FcLowPriority } from "react-icons/fc";
import { CheckCircle2, Clock3, LoaderCircle, Lock, Wrench, XCircle } from "lucide-react";
const AssigndIssueRow = ({ issue, handleChangeStatus }) => {
  const statusIcon = {
    pending: <Clock3 className="size-3" />,
    rejected: <XCircle className="size-3" />,
    "in-progress": <LoaderCircle className="size-3" />,
    working: <Wrench className="size-3" />,
    resolved: <CheckCircle2 className="size-3" />,
    closed: <Lock className="size-3" />,
  };

  const statusColor = {
    pending: "bg-blue-100 text-blue-800",
    rejected: "bg-red-100 text-red-800",
    "in-progress": "bg-indigo-100 text-indigo-800",
    working: "bg-purple-100 text-purple-800",
    resolved: "bg-green-100 text-green-800",
    closed: "bg-amber-100 text-amber-800",
  };

  const changeStatusBtn = [
    {
      status: "pending",
      setStatus: "in-progress",
      statusColor: "bg-blue-100 text-blue-800",
      icon: <Clock3 className="size-3" />
    },
    {
      status: "in-progress",
      setStatus: "working",
      statusColor: "bg-purple-100 text-purple-800",
      icon: <Wrench className="size-3" />
    },
    {
      status: "working",
      setStatus: "resolved",
      statusColor: "bg-green-100 text-green-800",
      icon: <CheckCircle2 className="size-3" />
    },
    {
      status: "resolved",
      setStatus: "closed",
      statusColor: "bg-amber-100 text-amber-800",
      icon: <Lock className="size-3" />
    },
  ];


  const {
    issueTitle,
    createAt,
    photo,
    region: Region,
    status,
    upvoteCount,
    category,
    district,
    priority,
    trackingId,
  } = issue;


  const currentBtn = changeStatusBtn.find(
    (btn) => btn.status === status
  )

  return (
    <tr className="hover:bg-zinc-50/50 transition-colors">

      <td className="px-5 py-4">
        <div className="flex items-center gap-3">

          <img src={photo} className="size-12 rounded-lg object-cover" alt={issueTitle} />

          <div>
            <p className="font-semibold text-zinc-900 max-w-36 truncate">{issueTitle}</p>
            <p className="text-xs text-zinc-500">
              {category} ({upvoteCount})
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-4">
        <div>
          <p className="font-semibold text-zinc-900">{trackingId}</p>
          <p className="text-xs text-zinc-500">
            {DateFormat(createAt)}
          </p>

        </div>
      </td>

      <td className="px-5 py-4">
        <p className="font-medium text-zinc-900">{district}, {Region}</p>
      </td>
      <td className="px-5 py-4">
        <div
          className={` bg-app-cream rounded-2xl px-2.5 py-0.5 flex items-center text-md font-bold justify-start gap-1 ${statusColor[status]}`}
        >
          <span>{statusIcon[status]}</span>
          <span className="text-xs font-semibold">
            {CapitalizeFirstLetter(status)}
          </span>
        </div>
      </td>

      <td className="px-5 py-4">

        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-xl ${priority === "normal" ? "text-app-success bg-app-success/10" : "text-app-error bg-app-error/10"
          }`}>{CapitalizeFirstLetter(priority)}</span>

      </td>
      <td className="px-5 py-4 text-right">


        <div className="text-md text-accent">
          {currentBtn && (
            <button
              onClick={() => handleChangeStatus(issue, currentBtn.setStatus)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border-r-8 border-transparent outline-none cursor-pointer leading-tight ${currentBtn.statusColor}`}
            >
              {currentBtn.icon}
              <span>{currentBtn.setStatus}</span>
            </button>
          )}
          {
            status === 'closed' && <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border-r-8 border-transparent outline-none leading-tight text-app-green bg-app-green/5">
              <CheckCircle2 className="size-3" /> Done
            </div>
          }
          {/* {status === "pending" && (
            <button
              onClick={() => handleChangeStatus(issue, "in-progress")}
              className={`flex-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border-r-8 border-transparent outline-none cursor-pointer leading-tight bg-zinc-100 text-zinc-800`}
            >

              <GrUserWorker size={16} />

              In-Progress
            </button>
          )}

          {status === "in-progress" && (
            <button
              onClick={() => handleChangeStatus(issue, "working")}
              className={`flex-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border-r-8 border-transparent outline-none cursor-pointer leading-tight ${statusColor[status]}`}
            >

              <GrUserWorker size={16} />

              Working
            </button>
          )}
          {status === "working" && (
            <button
              onClick={() => handleChangeStatus(issue, "resolved")}
              className="btn-small hover:bg-primary hover:text-white btn-sm flex items-center justify-center gap-1 font-bold text-lg text-blue-600 bg-blue-100 rounded-3xl px-3"
            >
              <span>
                <GrUserWorker size={16} />
              </span>
              <span>Resolved</span>
            </button>
          )}
          {status === "resolved" && (
            <button
              onClick={() => handleChangeStatus(issue, "closed")}
              className="btn-small-black hover:bg-primary hover:text-white btn-sm flex items-center justify-center gap-1 font-bold text-lg text-blue-600 bg-blue-100 rounded-3xl px-3"
            >
              <span>
                <GrUserWorker size={16} />
              </span>
              <span>Closed</span>
            </button>
          )}
          {status === "closed" && (
            <button
              className="btn-small-black hover:bg-primary hover:text-white btn-sm flex items-center justify-center gap-1 font-bold text-lg text-blue-600 bg-blue-100 rounded-3xl px-3"
            >
              <span>
                <GrUserWorker size={16} />
              </span>
              <span>Done</span>
            </button>
          )} */}
        </div>
      </td>
    </tr >
  );
};

export default AssigndIssueRow;
