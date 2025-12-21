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
    <tr className="hover">
      <th>{index + 1}</th>
      <td
        className="flex justify-start
        items-center gap-3 min-w-[250px]"
      >
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
      <td className="whitespace-nowrap">{trackingId}</td>
      <td className="whitespace-nowrap">{DateFormat(createAt)}</td>
      <td>
        <div
          className={`flex items-center text-md font-bold justify-start gap-1 ${statusColor[status]}`}
        >
          <span>{statusIcon[status]}</span>
          <span className="space-x-2 whitespace-nowrap">
            {CapitalizeFirstLetter(status)}{" "}
          </span>
        </div>
      </td>

      {/* sttaf info */}

      <td>
        <div className="collapse collapse-arrow bg-base-100 border border-base-200 min-w-[150px]">
          <input type="checkbox" className="peer" />
          <div className="collapse-title p-2 text-sm font-semibold">
            {assignedStaff ? (
              CapitalizeFirstLetter(assignedStaff.status)
            ) : (
              <span className="text-red-500">Not Assigned</span>
            )}
          </div>
          {assignedStaff && (
            <div className="collapse-content text-xs">
              <p>{assignedStaff.staffName}</p>
              <p>{assignedStaff.staffContact}</p>{" "}
              {/* Fixed typo from sttafContact */}
            </div>
          )}
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
        {status === "pending" && (
          <button
            onClick={() => {
              if (modelRef?.current) {
                // modelRef.current.showModal();
                setEditIssue(issue);
              }
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
