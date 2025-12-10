import React, { useEffect, useState } from "react";
import { DateFormat } from "../../Utility/FormateDate";
import {
  MdAdminPanelSettings,
  MdLockOutline,
  MdOutlinePendingActions,
  MdOutlineTaskAlt,
} from "react-icons/md";
import { LuShieldPlus } from "react-icons/lu";
import { GrUserWorker } from "react-icons/gr";
import { LuShieldOff } from "react-icons/lu";

import { CapitalizeFirstLetter } from "../../Utility/CapitalizeFirstLetter";
import { FcHighPriority, FcLowPriority } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { FaUserAstronaut } from "react-icons/fa";
const UserRow = ({ user, index, refetch, setEditIssue, modelRef }) => {
  const axiosSecure = useAxiosSecure();
  const statusIcon = {
    pending: <MdOutlinePendingActions size={20} />,
    "in-progress": <AiOutlineLoading3Quarters size={20} />,
    resolved: <MdOutlineTaskAlt size={20} />,
    closed: <MdLockOutline size={20} />,
  };
  const roleIcon = {
    citizen: <FaUserAstronaut size={20} />,
    staff: <GrUserWorker size={20} />,
    admin: <MdAdminPanelSettings size={20} />,
  };
  const statusColor = {
    active: "text-green-600",
    blocked: "text-red-600",
  };
  const roleColor = {
    citizen: "text-green-600",
    staff: "text-blue-600",
    admin: "text-red-600",
  };
  const {
    isSubscribed,
    planType,
    accountStatus,
    role,
    createdAt,
    photoURL,
    displayName,
    email,
    _id,
  } = user;

  const handleChangeStatus = () => {
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
        const updateinfo = {
          accountStatus: accountStatus === "active" ? "blocked" : "active", // toggle
        };
        axiosSecure.patch(`/users/${_id}`, updateinfo).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount) {
            refetch();
            // navigate("/all-issues");
            Swal.fire({
              position: "top-right",
              title: "Status Updated!",
              icon: "success",
              text: "Users Status has been deleted.",
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
      {/* user */}
      <td className="flex items-center justify-start gap-4">
        <img src={photoURL} className="w-12 rounded-full" alt="" />
        <div>
          <p className="font-semibold text-[16px]">{displayName}</p>
          <p className="font-semibold text-primary">{email}</p>
        </div>
      </td>
      {/* role */}
      <td>
        <div
          className={`flex items-center text-md font-bold justify-start gap-1 ${roleColor[role]}`}
        >
          <span>{roleIcon[role]}</span>
          <span>{CapitalizeFirstLetter(role)} </span>
        </div>
      </td>
      <td>{DateFormat(createdAt)}</td>

      <td>
        <div
          className={`flex items-center text-md font-bold justify-start gap-1 ${statusColor[accountStatus]}`}
        >
          <span>{statusIcon[accountStatus]}</span>
          <span>{CapitalizeFirstLetter(accountStatus)} </span>
        </div>
      </td>

      <td
        className={`font-bold text-lg ${
          planType === "admin"
            ? "text-red-600"
            : planType === "boosted"
            ? "text-blue-600"
            : ""
        }`}
      >
        {CapitalizeFirstLetter(planType)}
      </td>

      <td>{isSubscribed ? <></> : <h1>Not Sub</h1>}</td>
      <td className="space-x-2">
        {accountStatus === "active" ? (
          <button
            className="btn-small-red hover:bg-primary hover:text-white btn-sm flex items-center justify-center gap-1 font-bold text-lg text-blue-600 bg-blue-100 rounded-3xl px-3"
            onClick={handleChangeStatus}
          >
            <span>
              <LuShieldOff size={16} />
            </span>
            <span>Block</span>
          </button>
        ) : (
          <button
            onClick={handleChangeStatus}
            className="btn-small hover:bg-primary hover:text-white btn-sm flex items-center justify-center gap-1 font-bold text-lg text-blue-600 bg-blue-100 rounded-3xl px-3"
          >
            <span>
              <LuShieldPlus size={16} />
            </span>
            <span>Unblock</span>
          </button>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
