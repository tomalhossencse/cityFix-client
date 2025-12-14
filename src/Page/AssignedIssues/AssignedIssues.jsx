import React, { useContext, useRef, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import IssueEdit from "../../Components/IssueEdit/IssueEdit";
import Swal from "sweetalert2";
import AssignStaffRow from "../AllIssuesDashboard/AssignStaffRow";
import { AuthContext } from "../../Context/AuthContext";
import AssigndIssueRow from "./AssigndIssueRow";
const AssignedIssues = () => {
  const assignModelRef = useRef();
  const [selectedIssue, setSelectedIssue] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const {
    data: issues = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["issues", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/sttafs?email=${user?.email}`);
      return res.data;
    },
  });

  const { data: sttafs = [] } = useQuery({
    queryKey: [
      "sttafs-filter",
      selectedIssue?.district,
      selectedIssue?.category,
    ],
    enabled: !!selectedIssue,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/sttafs-filter?district=${selectedIssue?.district}&category=${selectedIssue?.category}`
      );
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }

  const handleChangeStatus = async (issue, updateStatus) => {
    // console.log(issue);
    try {
      const statusMessages = {
        assigned: `Staff ${issue.assignedStaff?.staffName} has been assigned to this issue.`,
        "in-progress": `Staff ${issue.assignedStaff?.staffName} is working on this issue.`,
        resolved: `Issue has been resolved by ${issue.assignedStaff?.staffName}.`,
        closed: `Issue has been closed.`,
      };

      const successTexts = {
        assigned: "Issue assigned successfully",
        "in-progress": "Work started",
        resolved: "Issue resolved",
        closed: "Issue closed",
      };
      const {
        staffId,
        staffName,
        staffEmail,
        staffPhoto,
        sttafContact,
        status,
      } = issue.assignedStaff;
      const updateData = {
        assignedStaff: {
          staffId,
          staffName,
          staffEmail,
          staffPhoto,
          sttafContact,
          status,
        },
        status: updateStatus,
        message: statusMessages[updateStatus] || "status updated",
        role: "staff",
      };

      const res = await axiosSecure.patch(
        `/issues/${issue._id}/timeline`,
        updateData
      );

      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          icon: "success",
          title: successTexts[updateStatus],
          position: "top-right",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to update status",
      });
    }
  };
  return (
    <>
      <div className="p-8 bg-base-100 m-8 rounded-xl">
        <div>
          <div className="flex px-4 section-title">
            Assigned issues : ({issues.length})
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table border-2 border-base-200 table-zebra">
            {/* head */}
            <thead className="bg-base-200">
              <tr>
                <th></th>
                <th>Issue Title</th>
                <th>Tracking Id</th>
                <th>Created Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue, index) => (
                <AssigndIssueRow
                  setSelectedIssue={setSelectedIssue}
                  issue={issue}
                  handleChangeStatus={handleChangeStatus}
                  key={issue._id}
                  index={index}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>

          {/* assign model */}

          <dialog
            ref={assignModelRef}
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <div className="overflow-x-auto">
                <table className="table border-2 border-base-200 table-zebra">
                  {/* head */}
                  <thead className="bg-base-200">
                    <tr>
                      <th>No.</th>
                      <th>Sttaf</th>
                      <th>Address</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sttafs.map((sttaf, index) => (
                      <AssignStaffRow
                        key={sttaf._id}
                        sttaf={sttaf}
                        index={index}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn-small">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </>
  );
};

export default AssignedIssues;
