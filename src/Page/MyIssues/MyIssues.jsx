import React, { useContext, useRef, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthContext";
import Loading from "../../Components/Loading/Loading";
import IssueRow from "./IssueRow";
import IssueEdit from "../../Components/IssueEdit/IssueEdit";
import { useForm } from "react-hook-form";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

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
      <div className="bg-white rounded-2xl shadow-sm border border-app-border overflow-hidden">
        <div className="px-6 py-5 border-b border-app-border flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-xl font-semibold text-zinc-900">
            Issues
          </h2>
          <Link
            to="/dashboard/issues/new"
            className="flex items-center gap-2 px-4 py-2 bg-app-green text-white rounded-xl hover:bg-green-950 transition-colors font-medium text-sm"
          >
            <PlusIcon className="size-4" /> Add Issue
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="relative w-full text-left text-sm whitespace-nowrap">
            {/* head */}
            <thead className="bg-app-cream/50 text-zinc-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Issue</th>
                <th className="px-6 py-4">Tnxid / Create</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Staff</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border">
              {issues.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-zinc-500"
                  >
                    No issues found matching filters.
                  </td>
                </tr>
              ) : (
                issues.map((issue, index) => (
                  <IssueRow
                    modelRef={modelRef}
                    setEditIssue={setEditIssue}
                    key={issue._id}
                    issue={issue}
                    index={index}
                    refetch={refetch}
                  />
                ))
              )}
            </tbody>
          </table>

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
