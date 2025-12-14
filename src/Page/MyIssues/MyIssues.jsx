import React, { useContext, useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthContext";
import Loading from "../../Components/Loading/Loading";
import IssueRow from "./IssueRow";
import IssueEdit from "../../Components/IssueEdit/IssueEdit";
import { useForm } from "react-hook-form";

const MyIssues = () => {
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
  const { user } = useContext(AuthContext);
  const modelRef = useRef();
  const [editIssue, setEditIssue] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { register, watch } = useForm();

  const status = watch("status");
  const priority = watch("priority");
  const category = watch("category");

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
  //   console.log(issues);
  return (
    <>
      <div className="p-8 bg-base-100 m-8 rounded-xl">
        <div>
          <div className="flex px-4 section-title">
            My Issues : ({issues.length})
          </div>
          {/* status filter */}

          <select
            className="select select-bordered w-[120px] md:w-[180px]"
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
            className="select select-bordered w-[120px] md:w-[180px]"
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
            className="select select-bordered w-[120px] md:w-[180px]"
            {...register("category")}
            defaultValue={""}
          >
            <option value={""}>All (Category)</option>
            {categoriesCollections.map((cat, index) => (
              <option key={index}>{cat}</option>
            ))}
          </select>
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
                <th>Staff Info</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue, index) => (
                <IssueRow
                  setEditIssue={setEditIssue}
                  key={issue._id}
                  issue={issue}
                  index={index}
                  modelRef={modelRef}
                  refetch={refetch}
                  setIs
                />
              ))}
            </tbody>
          </table>

          {editIssue && (
            <IssueEdit
              isLoading={isLoading}
              issue={editIssue}
              modelRef={modelRef}
              refetch={refetch}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MyIssues;
