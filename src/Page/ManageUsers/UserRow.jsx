import React from "react";
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
const UserRow = ({ user, index, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const statusIcon = {
    active: <FaCheckCircle size={24} />,
    blocked: <ImBlocked size={24} />,
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
        axiosSecure.patch(`/users/${_id}`, updateinfo).then((res) => {
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
    <tr>
      <th>{index + 1}</th>
      {/* user */}
      <td className="flex items-center justify-start gap-4   ">
        <img src={photoURL} className="w-12 rounded-full" alt="" />
        <div>
          <p className="font-semibold text-[16px]">
            {CapitalizeFirstLetter(displayName)}
          </p>
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
          {/* <span>{CapitalizeFirstLetter(accountStatus)} </span> */}
        </div>
      </td>

      <td>
        {planType === "premium" ? (
          <MdWorkspacePremium
            size={28}
            title="Premium User"
            className="text-red-600"
          />
        ) : planType === "admin" ? (
          <GrUserAdmin size={24} className="text-accent" title="Admin" />
        ) : (
          <FaRegUser className="text" title="Free user" size={24} />
        )}
      </td>

      <td>
        {isSubscribed ? (
          <>
            <div
              tabIndex={0}
              className="collapse collapse-arrow bg-base-100 border-base-200 border"
            >
              <div className="collapse-title font-semibold text-primary">
                status : {CapitalizeFirstLetter(paymentStatus)}
              </div>
              <div className="collapse-content text-md text-accent">
                <p className="text-[12px]">Tnxid : {transactionId}</p>
                <p>PaidAt : {DateFormat(paidAt)}</p>
              </div>
            </div>
          </>
        ) : (
          <div
            tabIndex={0}
            className="collapse collapse-arrow bg-base-100 border-base-200 border"
          >
            <div className="collapse-title font-semibold text-red-500">
              status : Unpaid
            </div>
            <div className="collapse-content text-md text-accent">
              <p>No premium subscription.</p>
            </div>
          </div>
        )}
      </td>
      <td className="space-x-2   ">
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
