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
const AssigndIssueRow = ({ issue, index, handleChangeStatus }) => {
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
    status,
    upvoteCount,
    category,
    district,
    priority,
    trackingId,
  } = issue;

  return (
    <tr>
      <th>{index + 1}</th>
      <td className="flex justify-start
        items-center gap-3 min-w-[250px]">
      <div>
          <img src={photo} className="mask mask-squircle h-10 w-10" alt="" />
      </div>
        <div>
          <p className="font-semibold">{issueTitle}</p>
          <p className="font-semibold text-primary">
            {category} ({upvoteCount})
          </p>
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
      <td className="whitespace-nowrap">{DateFormat(createAt)}</td>
      <td className="whitespace-nowrap">
        <div
          className={`flex items-center text-md font-bold justify-start gap-1 ${statusColor[status]}`}
        >
          <span>{statusIcon[status]}</span>
          <span>{CapitalizeFirstLetter(status)} </span>
        </div>
      </td>
      <td className="whitespace-nowrap">
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
      <td className="whitespace-nowrap">
        <div
          tabIndex={0}
          className="collapse collapse-arrow bg-base-100 border border-base-200 min-w-[150px]"
        >
          <div
            className={`${
              status === "closed"
                ? "btn-small"
                : status === "rejected"
                ? "btn-small-red"
                : "btn-small-blue"
            } collapse-title font-semibold text-primary`}
          >
            {status === "closed"
              ? "Closed"
              : status === "rejected"
              ? "Rejected"
              : "Change Status"}
          </div>
          <div className="collapse-content text-md text-accent">
            {status === "pending" && (
              <button
                onClick={() => handleChangeStatus(issue, "in-progress")}
                className={`btn-small-red hover:bg-primary hover:text-white btn-sm flex items-center justify-center gap-1 font-bold text-lg text-blue-600 bg-blue-100 rounded-3xl px-3 `}
              >
                <span>
                  <GrUserWorker size={16} />
                </span>
                <span>In-Progress</span>
              </button>
            )}

            {status === "in-progress" && (
              <button
                onClick={() => handleChangeStatus(issue, "working")}
                className="btn-small-blue hover:bg-primary hover:text-white btn-sm flex items-center justify-center gap-1 font-bold text-lg text-blue-600 bg-blue-100 rounded-3xl px-3"
              >
                <span>
                  <GrUserWorker size={16} />
                </span>
                <span>Working</span>
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
          </div>
        </div>
      </td>
    </tr>
  );
};

export default AssigndIssueRow;
