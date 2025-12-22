import React, { useContext, useRef, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthContext";
import Loading from "../../Components/Loading/Loading";
import IssueRow from "./IssueRow";
import IssueEdit from "../../Components/IssueEdit/IssueEdit";
import { useForm } from "react-hook-form";
const STATUS_OPTIONS = [
  "pending",
  "rejected",
  "in-progress",
  "working",
  "resolved",
  "closed",
];
const PRIORITY_OPTIONS = ["normal", "high"];
const CATEGORY_OPTIONS = [
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
const MyIssues = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { register, watch } = useForm();

  const [editIssue, setEditIssue] = useState(null);
  const modelRef = useRef();

  const filters = watch(["status", "priority", "category"]);
  const [status, priority, category] = filters;

  const {
    data: issues = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-issues", user?.email, status, priority, category],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-issues", {
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="p-4 md:p-8 bg-base-100 m-4 md:m-8 rounded-xl shadow-sm">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
          <h2 className="text-xl font-bold">My Issues ({issues.length})</h2>
          {/* status filter */}

          <div className="flex flex-wrap gap-2">
            <select
              className="select select-bordered   md:w-[180px]"
              {...register("status")}
            >
              <option value="">All Status</option>
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered   md:w-[180px]"
              {...register("priority")}
            >
              <option value="">All Priority</option>
              {PRIORITY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered   md:w-[180px]"
              {...register("category")}
            >
              <option value="">All Categories</option>
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table border-2 border-base-200 table-zebra">
            {/* head */}
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Issue Title</th>
                <th>Tracking Id</th>
                <th>Created</th>
                <th>Status</th>
                <th>Staff</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue, index) => (
                <IssueRow
                  modelRef={modelRef}
                  setEditIssue={setEditIssue}
                  key={issue._id}
                  issue={issue}
                  index={index}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
          <div>
            {issues.length === 0 && (
              <p className="text-center py-10 text-gray-400">
                No issues found matching filters.
              </p>
            )}
          </div>

          <IssueEdit
            setEditIssue={setEditIssue}
            isLoading={isLoading}
            issue={editIssue}
            modelRef={modelRef}
            refetch={refetch}
          />
        </div>
      </div>
    </>
  );
};

export default MyIssues;
