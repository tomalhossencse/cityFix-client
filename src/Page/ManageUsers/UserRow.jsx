import React, { useState } from "react";
import { DateFormat } from "../../Utility/FormateDate";
import { MdAdminPanelSettings, MdWorkspacePremium } from "react-icons/md";
import { LuShieldPlus } from "react-icons/lu";
import { GrUserAdmin, GrUserWorker } from "react-icons/gr";
import { LuShieldOff } from "react-icons/lu";
import { ImBlocked } from "react-icons/im";
import { CapitalizeFirstLetter } from "../../Utility/CapitalizeFirstLetter";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { FaCheckCircle, FaRegUser, FaUserAstronaut } from "react-icons/fa";
import Loading from "../../Components/Loading/Loading";

const UserRow = ({ user, refetch }) => {

  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const statusIcon = {
    active: <FaCheckCircle className="size-3" />,
    blocked: <ImBlocked className="size-3" />,
  };
  const roleIcon = {
    citizen: <FaUserAstronaut className="size-3" />,
    staff: <GrUserWorker className="size-3" />,
    admin: <MdAdminPanelSettings className="size-3" />,
  };
  const statusColor = {
    active: "text-green-600 bg-green-100",
    blocked: "text-red-600 bg-red-100",
  };
  const roleColor = {
    citizen: "text-green-600 bg-green-100",
    staff: "text-blue-600 bg-blue-100",
    admin: "text-red-600 bg-red-100",
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
    transactionId,
    paidAt,
    paymentStatus,
  } = user;

  const handleChangeStatus = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change Status!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updateinfo = {
          accountStatus: accountStatus === "active" ? "blocked" : "active", // toggle
        };
        axiosSecure.patch(`/users/${_id}/status`, updateinfo).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount) {
            refetch();
            // navigate("/all-issues");
            Swal.fire({
              position: "top-right",
              title: "Status Updated!",
              icon: "success",
              text: "Users status has been changed.",
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
      {/* user */}
      <td
        className="px-3 py-4"
      >
        <div className="flex items-center gap-3">
          <img src={photoURL} className="size-12 rounded-lg object-cover" alt={displayName} />
          <div>
            <p className="font-semibold text-zinc-900 max-w-32 truncate"> {CapitalizeFirstLetter(displayName)}</p>
            <p className="text-xs text-zinc-500 max-w-32 truncate">
              {email}
            </p>
          </div>

        </div>

      </td>

      {/* role */}
      <td className="px-3 py-4">
        <div
          className={`rounded-lg px-2 py-1 flex items-center text-xs font-bold justify-start gap-1 ${roleColor[role]}`}
        >
          <span>{roleIcon[role]}</span>
          <span >{CapitalizeFirstLetter(role)} </span>
        </div>
      </td>
      <td className="px-3 py-4 text-xs text-app-text-light">{DateFormat(createdAt)}</td>

      <td className="px-3 py-4">
        <div
          className={`rounded-lg px-2 py-1 flex items-center text-xs font-bold justify-start gap-1 ${statusColor[accountStatus]}`}
        >
          <span>{statusIcon[accountStatus]}</span>
          <span>{CapitalizeFirstLetter(accountStatus)}</span>
        </div>
      </td>

      <td className="px-8 py-4">

        {planType === "premuim" ? (
          <MdWorkspacePremium
            title="Premium User"
            className="size-5 text-app-success"
          />
        ) : planType === "admin" ? (
          <GrUserAdmin className="size-4 text-app-error" title="Admin" />
        ) : (
          <FaRegUser className="size-4 text-app-orange" title="Free user" />
        )}

      </td>

      <td className="px-3 py-4 align-middle font-sans">
        <div className={`relative inline-block `}>

          {/* Trigger Button */}
          <button
            type="button"
            onClick={(e) => { setIsOpen(!isOpen); e.stopPropagation() }}
            className={`flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 text-left  transition-all duration-150 focus:outline-none ${isOpen
              ? 'border-slate-300 bg-slate-50 shadow-xs'
              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
          >
            {/* Compact Badges */}
            {isSubscribed ? (
              <span className="inline-flex items-center rounded-md bg-emerald-50 px-1.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
                {CapitalizeFirstLetter(paymentStatus)}
              </span>
            ) : (
              <span className="inline-flex items-center rounded-md bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10">
                Unpaid
              </span>
            )}

            {/* Micro Chevron */}
            <svg
              className={`h-3.5 w-3.5 text-slate-400 shrink-0 transition-transform duration-150 ${isOpen ? 'rotate-180 text-slate-600' : ''
                }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Floating Micro-Dropdown Content */}
          {isOpen && (
            <div className="absolute -left-14 z-10 mt-1 min-w-20 rounded-lg border border-slate-200 bg-white p-2.5 shadow-lg animate-in fade-in slide-in-from-top-1 duration-500 animate-fade-in transition-all">
              <div className="space-y-1.5 text-[11px] leading-tight text-slate-600">
                {isSubscribed ? (
                  <>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-slate-400 font-medium">TXN ID</span>
                      <span className="font-mono text-slate-700 truncate select-all" title={transactionId}>
                        {transactionId}
                      </span>
                    </div>
                    <div className="h-px bg-slate-100 my-1" />
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Paid At</span>
                      <span className="text-slate-700 font-medium">{DateFormat(paidAt)}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-1.5 text-slate-500 py-0.5">
                    <svg className="h-3.5 w-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>No active premium tier</span>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </td>
      <td className="px-3 py-4">
        {accountStatus === "active" ? (
          <button
            className="p-2 text-zinc-500 hover:text-app-orange bg-zinc-100 hover:bg-zinc-50 rounded-lg transition-colors"
            onClick={handleChangeStatus}
          >
            <span>
              <LuShieldOff size={16} />
            </span>
          </button>
        ) : (
          <button
            onClick={handleChangeStatus}
            className="p-2 text-zinc-500 hover:text-app-orange bg-zinc-100 hover:bg-zinc-50 rounded-lg transition-colors"
          >
            <span>
              <LuShieldPlus size={16} />
            </span>
          </button>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
