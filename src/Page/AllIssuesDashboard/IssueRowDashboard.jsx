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
const IssueRowDashboard = ({
  issue,
  index,
  setSelectedIssue,
  assignModelRef,
  handleReject,
}) => {
  const statusIcon = {
    pending: <MdOutlinePendingActions size={20} />,
    rejected: <MdCancel size={20} />,
    "in-progress": <AiOutlineLoading3Quarters size={20} />,
    working: <FaPersonRunning size={20} />,
    resolved: <MdOutlineTaskAlt size={20} />,
    closed: <MdLockOutline size={20} />,
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
    assignModelRef.current.showModal();
  };
  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div className="flex items-center gap-3 max-w-[250px]">
          <div className="avatar">
            <div className="mask mask-squircle h-10 w-10">
              <img src={photo} className="object-cover" />
            </div>
          </div>
          <div>
            <div className="font-semibold">{issueTitle}</div>
            <p className="font-semibold text-primary">
              {category} ({upvoteCount})
            </p>
          </div>
        </div>
      </td>

      <td className="whitespace-nowrap">
        <div>
          <p>{trackingId}</p>
          <p>
            {district}, {Region}
          </p>
        </div>
      </td>
      <td>{DateFormat(createAt)}</td>
      <td>
        <div
          className={`flex items-center text-md font-bold justify-start gap-1 ${statusColor[status]}`}
        >
          <span>{statusIcon[status]}</span>
          <span>{CapitalizeFirstLetter(status)} </span>
        </div>
      </td>

      <td>
        <div
          className={`flex gap-1 items-center justify-start ${
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
          <span className={`font-bold`}>{CapitalizeFirstLetter(priority)}</span>
        </div>
      </td>
      <td className="space-x-2 whitespace-nowrap">
        {assignedStaff || status === "rejected" ? (
          <button
            disabled
            className={`${
              status === "rejected" ? "btn-small-red" : "btn-small-blue"
            } hover:bg-primary hover:text-white btn-sm flex items-center justify-center gap-1 font-bold text-lg  rounded-3xl px-3`}
          >
            <span>
              {status === "rejected" ? (
                <MdCancel size={16} />
              ) : (
                <GrUserWorker size={16} />
              )}
            </span>
            <span>{status === "rejected" ? "Rejected" : "Assigned"}</span>
          </button>
        ) : (
          <>
            <button
              onClick={() => handleOpenModel(issue)}
              className="btn-small-black hover:bg-primary hover:text-white btn-sm flex items-center justify-center gap-1 font-bold text-lg text-blue-600 bg-blue-100 rounded-3xl px-3"
            >
              <span>
                <GrUserWorker size={16} />
              </span>
              <span>Assign Staff</span>
            </button>

            <button
              onClick={() => handleReject(issue)}
              className="btn-small-red hover:bg-primary hover:text-white btn-sm flex items-center justify-center gap-1 font-bold text-lg text-blue-600 bg-blue-100 rounded-3xl px-3"
            >
              <span>
                <MdCancel size={16} />
              </span>
              <span>Reject</span>
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default IssueRowDashboard;
