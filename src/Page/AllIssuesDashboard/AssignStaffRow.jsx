import React, { useContext } from "react";
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
import { AuthContext } from "../../Context/AuthContext";
const AssignStaffRow = ({ sttaf, index, refetch, handleAssignSttaf }) => {
  const axiosSecure = useAxiosSecure();

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
      <td className="flex items-center justify-start gap-4 whitespace-nowrap">
        <img src={sttaf.photo} className="w-8 rounded-full" alt="" />
        <div>
          <p className="font-semibold text-[14px]">
            {CapitalizeFirstLetter(sttaf.sttafName)}
          </p>
          {/* <p className="font-semibold text-sm text-primary">{sttaf.email}</p> */}
        </div>
      </td>
      <td className="text-[12px]">
        {sttaf.district}, {sttaf.region}
      </td>
      <td>
        {" "}
        <button
          className="btn-small-red hover:bg-primary hover:text-white btn-sm flex items-center justify-center gap-1 font-bold text-lg text-blue-600 bg-blue-100 rounded-3xl px-3"
          onClick={() => handleAssignSttaf(sttaf)}
        >
          <span>
            <LuShieldOff size={16} />
          </span>
          <span>Assign</span>
        </button>
      </td>
      {/* role */}
    </tr>
  );
};

export default AssignStaffRow;
