import React from "react";
import { DateFormat } from "../../Utility/FormateDate";
import {
  MdCancel,
  MdEditSquare,
  MdLockOutline,
  MdOutlinePendingActions,
  MdOutlineTaskAlt,
} from "react-icons/md";
import { CapitalizeFirstLetter } from "../../Utility/CapitalizeFirstLetter";
import { FcHighPriority, FcLowPriority } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { Link } from "react-router";
import { FaEye } from "react-icons/fa";
import { FaPersonRunning } from "react-icons/fa6";
const IssueRow = ({ issue, index, refetch, setEditIssue, modelRef }) => {
  const axiosSecure = useAxiosSecure();
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

    trackingId,
    _id,
    assignedStaff,
  } = issue;

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/issues/${_id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            // navigate("/all-issues");
            Swal.fire({
              position: "top-right",
              title: "Deleted!",
              icon: "success",
              text: "Your Reported Issues has been deleted.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };
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

      {/* sttaf info */}

      <td>
        {assignedStaff ? (
          <>
            <div
              tabIndex={0}
              className="collapse collapse-arrow bg-base-100 border-base-200 border"
            >
              <div className="collapse-title font-semibold text-primary">
                {CapitalizeFirstLetter(assignedStaff?.status)}
              </div>
              <div className="collapse-content text-md text-accent">
                <p className="text-[14px]">{assignedStaff?.staffName}</p>
                <p>{assignedStaff?.sttafContact}</p>
              </div>
            </div>
          </>
        ) : (
          <div
            tabIndex={0}
            className="collapse collapse-arrow bg-base-100 border-base-200 border"
          >
            <div className="collapse-title font-semibold text-red-500">
              Not Assigned
            </div>
          </div>
        )}
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
          <button
            onClick={() => {
              setEditIssue(issue);
              modelRef.current.showModal();
            }}
            className="btn-small-black hover:bg-primary hover:text-white btn-sm flex items-center justify-center gap-1 font-bold text-lg text-blue-600 bg-blue-100 rounded-3xl px-3"
          >
            <span>
              <MdEditSquare />
            </span>
            <span>Edit</span>
          </button>
        )}
        <div
          onClick={handleDelete}
          className="flex items-center justify-center gap-1 btn-small-red"
        >
          <span>
            <RiDeleteBin5Fill size={16} />
          </span>
          <span>Delete</span>
        </div>

        <Link to={`/all-issues/${_id}`}>
          <button className="btn-small-blue">
            <FaEye size={15} />
            <span>View</span>
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default IssueRow;
