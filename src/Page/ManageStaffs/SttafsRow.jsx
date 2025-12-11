import React from "react";
import { DateFormat } from "../../Utility/FormateDate";
import {
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
const SttafsRow = ({
  sttaf,
  index,
  refetch,
  setEditStaff,
  modelUpdateRef,
  modelRef,
}) => {
  const axiosSecure = useAxiosSecure();
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
  const { email, photo, sttafName, district, region, createdAt, _id } = sttaf;

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
        axiosSecure.delete(`/sttafs/${_id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            // navigate("/all-issues");
            Swal.fire({
              position: "top-right",
              title: "Deleted!",
              icon: "success",
              text: "Your Sttafs has been deleted.",
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
        <img src={photo} className="w-14 rounded-full" alt="" />
        <div>
          <p className="font-semibold text-[16px]">{sttafName}</p>
          <p className="font-semibold text-primary">{email}</p>
        </div>
      </td>
      <td>
        {district}, {region}
      </td>
      <td>{DateFormat(createdAt)}</td>
      {/* <td>
        <div
          className={`flex items-center text-md font-bold justify-start gap-1 ${statusColor[status]}`}
        >
          <span>{statusIcon[status]}</span>
          <span>{CapitalizeFirstLetter(status)} </span>
        </div>
      </td> */}

      {/* <td> */}
      {/* <div
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
        </div> */}
      {/* </td> */}
      <td className="space-x-2">
        <button
          onClick={() => {
            setEditStaff(sttaf);
            modelUpdateRef?.current?.showModal();
          }}
          className="btn-small-black hover:bg-primary hover:text-white btn-sm flex items-center justify-center gap-1 font-bold text-lg text-blue-600 bg-blue-100 rounded-3xl px-3"
        >
          <span>
            <MdEditSquare />
          </span>
          <span>Edit</span>
        </button>

        <div
          onClick={handleDelete}
          className="flex items-center justify-center gap-1 btn-small-red"
        >
          <span>
            <RiDeleteBin5Fill size={16} />
          </span>
          <span>Delete</span>
        </div>
      </td>
    </tr>
  );
};

export default SttafsRow;
