import React, { useContext, useRef, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import Swal from "sweetalert2";
import AssignStaffRow from "../AllIssuesDashboard/AssignStaffRow";
import { AuthContext } from "../../Context/AuthContext";
import AssigndIssueRow from "./AssigndIssueRow";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { ChevronDown, PlusIcon } from "lucide-react";
import { categoriesData, priorityCollection, statusCollection } from "../../assets/assets";
const AssignedIssues = () => {

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
        resloved: `Issue has been resolved by ${issue.assignedStaff?.staffName}.`,
        closed: `Issue has been closed.`,
      };

      const successTexts = {
        assigned: "Issue assigned successfully",
        "in-progress": "In-progress",
        working: "Work started",
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
      <div className="bg-white rounded-2xl shadow-sm border border-app-border overflow-hidden">
        <div className="px-6 py-5 border-b border-app-border flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-xl font-semibold text-zinc-900">Assigned issues</h2>

          {/* Status */}
          <div className="relative w-full sm:w-auto">
            <select
              className="appearance-none w-full sm:w-40 pl-3 pr-8 py-2 text-sm bg-white rounded-xl border border-app-border focus:border-app-green outline-none cursor-pointer"
              {...register("status")}
              defaultValue={""}
            >
              <option value={""}>All (Status)</option>
              {statusCollection.map((status, index) => (
                <option key={index}>{status}</option>
              ))}
            </select>

            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-app-text-light pointer-events-none" />
          </div>

          {/* Priority */}
          <div className="relative w-full sm:w-auto">
            <select
              className="appearance-none w-full sm:w-40 pl-3 pr-8 py-2 text-sm bg-white rounded-xl border border-app-border focus:border-app-green outline-none cursor-pointer"
              {...register("priority")}
              defaultValue={""}
            >
              <option value={""}>All (Priority)</option>
              {priorityCollection.map((priority, index) => (
                <option key={index}>{priority}</option>
              ))}
            </select>

            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-app-text-light pointer-events-none" />
          </div>

          {/* Category */}
          <div className="relative w-full sm:w-auto">
            <select
              className="appearance-none w-full sm:w-40 pl-3 pr-8 py-2 text-sm bg-white rounded-xl border border-app-border focus:border-app-green outline-none cursor-pointer"
              {...register("category")}
              defaultValue={""}
            >
              <option value={""}>All (Category)</option>
              {categoriesData.map((cat, index) => (
                <option key={index}>{cat.title}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-app-text-light pointer-events-none" />
          </div>

          {/* <Link to="/dashboard/issues/new" className="flex items-center gap-2 px-4 py-2 bg-app-green text-white rounded-xl hover:bg-green-950 transition-colors font-medium text-sm">
            <PlusIcon className="size-4" /> Add Issue
          </Link> */}


        </div>
        <div className="overflow-x-auto">
          <table className="relative w-full text-left text-sm whitespace-nowrap">
            {/* head */}
            <thead className="bg-app-cream/50 text-zinc-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Issue Title</th>
                <th className="px-6 py-4">TnxId/ create</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border">
              {
                issues.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">
                      No issues found matching filters.
                    </td>
                  </tr>
                ) : (issues.map((issue) => (
                  <AssigndIssueRow
                    setSelectedIssue={setSelectedIssue}
                    issue={issue}
                    handleChangeStatus={handleChangeStatus}
                    key={issue._id}
                    refetch={refetch}
                  />
                )))
              }

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
                  <tbody className="divide-y divide-app-border">
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
