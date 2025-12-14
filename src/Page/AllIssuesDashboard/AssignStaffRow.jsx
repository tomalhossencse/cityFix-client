import React from "react";

import { LuShieldOff } from "react-icons/lu";

import { CapitalizeFirstLetter } from "../../Utility/CapitalizeFirstLetter";

const AssignStaffRow = ({ sttaf, index, handleAssignSttaf }) => {
  return (
    <tr>
      <th>{index + 1}</th>
      {/* user */}
      <td className="flex items-center justify-start gap-4 whitespace-nowrap">
        <img src={sttaf.photo} className="w-8 rounded-full" alt="" />
        <div>
          <p className="font-semibold text-[14px]">
            {CapitalizeFirstLetter(sttaf?.sttafName)}
          </p>
          {/* <p className="font-semibold text-sm text-primary">{sttaf.email}</p> */}
        </div>
      </td>
      <td className="text-[12px]">
        {sttaf?.district}, {sttaf?.region}
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
    </tr>
  );
};

export default AssignStaffRow;
