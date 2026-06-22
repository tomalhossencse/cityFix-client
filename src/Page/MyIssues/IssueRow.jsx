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
import { CheckCircle2, Clock3, EditIcon, Eye, LoaderCircle, Lock, Wrench, XCircle, XIcon } from "lucide-react";
const IssueRow = ({ issue, index, refetch, setEditIssue, modelRef }) => {
  const axiosSecure = useAxiosSecure();

  const statusIcon = {
    pending: <Clock3 className="size-3" />,
    rejected: <XCircle className="size-3" />,
    "in-progress": <LoaderCircle className="size-3" />,
    working: <Wrench className="size-3" />,
    resloved: <CheckCircle2 className="size-3" />,
    closed: <Lock className="size-3" />,
  };
  const statusColor = {
    pending: "text-yellow-600",
    rejected: "text-red-500",
    "in-progress": "text-blue-600",
    working: "text-pink-600",
    resloved: "text-green-600",
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
    <tr className="hover:bg-zinc-50/50 transition-colors">
      <td
        className="px-5 py-4"
      >
        <div className="flex items-center gap-3">
          <img src={photo} className="size-12 rounded-lg object-cover" alt={issueTitle} />
          <div className="max-w-48">

            <p className="font-semibold text-zinc-900 truncate">{issueTitle}</p>


            <p className="text-xs text-zinc-500">
              {category} ({upvoteCount})
            </p>
          </div>

        </div>

      </td>

      <td className="px-5 py-4">
        <p className="font-semibold text-zinc-900">{trackingId}</p>
        <p className="text-xs text-zinc-500">{DateFormat(createAt)}</p>
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

      {/* sttaf info */}

      <td className="px-5 py-4">
        <div className="relative group inline-block">
          <div className="flex items-center gap-1 font-semibold text-xs cursor-pointer">
            {assignedStaff ? (
              <>
                <span className="text-app-success bg-app-success/10 px-2.5 py-0.5 rounded-xl">{CapitalizeFirstLetter(assignedStaff.status)}</span>
              </>
            ) : (
              <span className="text-app-error bg-app-error/10 px-2.5 py-0.5 rounded-xl">
                Not Assigned
              </span>
            )}
          </div>

          {assignedStaff && (
            <div className="absolute left-0 top-full mt-2 z-20 hidden group-hover:block w-52 rounded-lg border border-app-border bg-white shadow-lg p-3 text-xs">
              <p className="font-semibold">{assignedStaff.staffName}</p>
              <p className="text-gray-500">{assignedStaff.staffContact}</p>
            </div>
          )}
        </div>
      </td>

      <td className="px-5 py-4">

        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-xl ${priority === "normal" ? "text-app-success bg-app-success/10" : "text-app-error bg-app-error/10"
          }`}>{CapitalizeFirstLetter(priority)}</span>

      </td>

      <td className="px-5 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          {status === "pending" && (
            <Link to={`/dashboard/issues/${issue._id}/edit`}
              // onClick={() => {
              //   if (modelRef?.current) {
              //     // modelRef.current.showModal();
              //     setEditIssue(issue);
              //   }
              // }}
              className="p-2 text-zinc-500 hover:text-app-orange bg-zinc-100 hover:bg-zinc-50 rounded-lg transition-colors"
            >
              <EditIcon className="size-4" />
            </Link>
          )}


          <Link to={`/all-issues/${_id}`} className="p-2 text-zinc-500 hover:text-app-orange bg-zinc-100 hover:bg-zinc-50 rounded-lg transition-colors">

            <Eye className="size-4" />


          </Link>


          <button
            onClick={handleDelete}
            className="p-2 text-zinc-500 hover:text-app-orange bg-zinc-100 hover:bg-zinc-50 rounded-lg transition-colors"
          >
            <XIcon className="size-4" />

          </button>
        </div>

      </td>
    </tr>
  );
};

export default IssueRow;
