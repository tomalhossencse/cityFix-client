import React from "react";
import { DateFormat } from "../../Utility/FormateDate";
import {
  MdCancel,
  MdLockOutline,
  MdOutlinePendingActions,
  MdOutlineTaskAlt,
} from "react-icons/md";
import { CapitalizeFirstLetter } from "../../Utility/CapitalizeFirstLetter";
import { FcHighPriority, FcLowPriority } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GrUserWorker } from "react-icons/gr";
import { FaPersonRunning } from "react-icons/fa6";
import { CheckCircle2, Clock3, LoaderCircle, Lock, Wrench, XCircle } from "lucide-react";
const IssueRowDashboard = ({
  issue,
  setSelectedIssue,
  setAssignModal,
  handleReject,
}) => {
  const statusIcon = {
    pending: <Clock3 className="size-3" />,
    rejected: <XCircle className="size-3" />,
    "in-progress": <LoaderCircle className="size-3" />,
    working: <Wrench className="size-3" />,
    resolved: <CheckCircle2 className="size-3" />,
    closed: <Lock className="size-3" />,
  };

  const statusColor = {
    pending: "text-yellow-600",
    rejected: "text-red-500",
    "in-progress": "text-blue-600",
    working: "text-pink-600",
    resolved: "text-green-600",
    closed: "text-gray-500",
  };
  const {
    issueTitle,
    createAt,
    photo,
    region: Region,
    priority,
    status,
    upvoteCount,
    category,
    district,
    trackingId,
    assignedStaff,
    _id,
  } = issue;

  const handleOpenModel = (issue) => {
    setSelectedIssue(issue);
    setAssignModal(true);
  };
  return (
    <tr className="hover:bg-zinc-50/50 transition-colors">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <img src={photo} className="size-12 rounded-lg object-cover" alt={issueTitle} />
          <div className="max-w-40 truncate">
            <p className="font-semibold text-zinc-900 truncate">{issueTitle}</p>
            <p className="text-xs text-zinc-500">
              {category} ({upvoteCount})
            </p>
          </div>
        </div>
      </td>

      <td className="px-3 py-4">
        <p className="font-semibold text-zinc-900">{trackingId}</p>
        <p className="text-xs text-zinc-500">{DateFormat(createAt)}</p>
      </td>

      <td className="px-3 py-4">
        <p className="font-medium text-sm text-zinc-900">{district}, {Region} </p>
      </td>

      <td className="px-3 py-4">
        <div
          className={` bg-app-cream rounded-2xl px-2.5 py-0.5 flex items-center text-md font-bold justify-start gap-1 ${statusColor[status]}`}
        >
          <span>{statusIcon[status]}</span>
          <span className="text-xs font-semibold">
            {CapitalizeFirstLetter(status)}
          </span>
        </div>
      </td>

      <td className="px-3 py-4">

        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-xl ${priority === "normal" ? "text-app-success bg-app-success/10" : "text-app-error bg-app-error/10"
          }`}>{CapitalizeFirstLetter(priority)}</span>

      </td>

      <td className="px-6 py-4 text-right">
        {assignedStaff || status === "rejected" ? (
          <button
            disabled
            className={`${status === "rejected" ? "text-app-error bg-app-error/20" : " bg-app-success/5 text-app-success"
              } flex-center  p-2 rounded-lg`}
          >
            <span>
              {status === "rejected" ? (
                <XCircle className="size-3" />) : (
                <Wrench className="size-3" />
              )}
            </span>
          </button>
        ) : (
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => handleOpenModel(issue)}
              className="p-2 text-app-success hover:text-app-orange bg-zinc-100 hover:bg-zinc-50 rounded-lg transition-colors"
            >
              <span>
                <GrUserWorker title="assign staff" className="size-4" />
              </span>
            </button>

            <button
              onClick={() => handleReject(issue)}
              className="p-2 text-zinc-500 hover:text-app-orange bg-zinc-100 hover:bg-zinc-50 rounded-lg transition-colors"
            >
              <span>
                <MdCancel className="siz-4" />
              </span>
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}

export default IssueRowDashboard;
