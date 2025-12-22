import React, { useContext, useRef, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import Swal from "sweetalert2";
import AssignStaffRow from "../AllIssuesDashboard/AssignStaffRow";
import { AuthContext } from "../../Context/AuthContext";
import AssigndIssueRow from "./AssigndIssueRow";
import { useForm } from "react-hook-form";
const AssignedIssues = () => {
  const statusCollection = [
    "pending",
    "rejected",
    "in-progress",
    "working",
    "resolved",
    "closed",
  ];
  const categoriesCollections = [
    "Road & Potholes",
    "Streetlights",
    "Water Leakage",
    "Garbage & Waste",
    "Drainage",
    "Footpath & Sidewalk",
    "Electricity",
    "Public Safety",
    "Traffic Signal",
    "Other",
  ];

  const priorityCollection = ["normal", "high"];
  const assignModelRef = useRef();
  const [selectedIssue, setSelectedIssue] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { register, watch } = useForm();
  const status = watch("status");
  const priority = watch("priority");
  const category = watch("category");

  const {
    data: issues = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["issues", user?.email, status, priority, category],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues/sttafs", {
        params: {
          email: user?.email,
          status,
          priority,
          category,
        },
      });
      return res.data;
    },
    enabled: !!user?.email,
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
      <div className="p-4 md:p-8 bg-base-100 m-4 md:m-8 rounded-xl shadow-sm">
        <div className="md:flex p-4 justify-between items-center mb-4 space-y-4">
          <h2 className="text-xl font-bold">Assigned issues : ({issues.length})</h2>

          {/* status filter */}

          <div className="flex justify-center flex-wrap gap-2">
            <select
              className="select select-bordered  md:w-[180px]"
              {...register("status")}
              defaultValue={""}
            >
              <option value={""}>All (Status)</option>
              {statusCollection.map((status, index) => (
                <option key={index}>{status}</option>
              ))}
            </select>

            {/* priority filter */}

            <select
              className="select select-bordered  md:w-[180px]"
              {...register("priority")}
              defaultValue={""}
            >
              <option value={""}>All (Priority)</option>
              {priorityCollection.map((priority, index) => (
                <option key={index}>{priority}</option>
              ))}
            </select>
            {/* category filter */}

            <select
              className="select select-bordered  md:w-[180px]"
              {...register("category")}
              defaultValue={""}
            >
              <option value={""}>All (Category)</option>
              {categoriesCollections.map((cat, index) => (
                <option key={index}>{cat}</option>
              ))}
            </select>
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
                <th>Priority</th>
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
