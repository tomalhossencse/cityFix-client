import React, { useRef } from "react";
import { DateFormat } from "../../Utility/FormateDate";
import {
  MdEditSquare,
  MdLockOutline,
  MdOutlinePendingActions,
  MdOutlineTaskAlt,
} from "react-icons/md";
import IssueEdit from "../../Components/IssueEdit/IssueEdit";
import { CapitalizeFirstLetter } from "../../Utility/CapitalizeFirstLetter";
import { FcHighPriority, FcLowPriority } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const IssueRow = ({ issue, index, refetch }) => {
  const modelRef = useRef();
  const statusIcon = {
    pending: <MdOutlinePendingActions size={20} />,
    "in-progress": <AiOutlineLoading3Quarters size={20} />,
    resolved: <MdOutlineTaskAlt size={20} />,
    closed: <MdLockOutline size={20} />,
  };
  const statusColor = {
    pending: "text-yellow-600",
    "in-progress": "text-blue-600",
    resolved: "text-green-600",
    closed: "text-gray-500",
  };
  const {
    issueTitle,
    createAt,
    photo,
    district,
    region: Region,
    priority,
    status,
    upvoteCount,
    category,
    displayName,
    number,
    email,
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
      <td>{trackingId}</td>
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
      <td className="space-x-2">
        {status === "pending" && (
          <div
            onClick={() => modelRef.current.showModal()}
            className="btn-small-black hover:bg-primary hover:text-white btn-sm flex items-center justify-center gap-1 font-bold text-lg text-blue-600 bg-blue-100 rounded-3xl px-3"
          >
            <span>
              <MdEditSquare />
            </span>
            <span>Edit</span>
          </div>
        )}
        <button className="btn-small-red">Delete</button>
      </td>
      <IssueEdit issue={issue} modelRef={modelRef} refetch={refetch} />
    </tr>
  );
};

export default IssueRow;
