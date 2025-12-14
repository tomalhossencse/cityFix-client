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
    trackingId,
  } = issue;

  return (
    <tr>
      <th>{index + 1}</th>
      <td className="flex items-center justify-start gap-4">
        <img src={photo} className="w-16 rounded-md" alt="" />
        <div>
          <p className="font-semibold text-[16px]">{issueTitle}</p>
          <p className="font-semibold text-primary">
            {category} ({upvoteCount})
          </p>
        </div>
      </td>
      <td>
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
          tabIndex={0}
          className="collapse collapse-arrow bg-base-100 border-base-200 border"
        >
          <div
            className={`${
              status === "closed" ? "btn-small" : "btn-small-red"
            } collapse-title font-semibold text-primary`}
          >
            {status === "closed" ? "Closed" : "Change Status"}
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
