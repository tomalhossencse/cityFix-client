import React, { useRef, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import IssueEdit from "../../Components/IssueEdit/IssueEdit";
import UserRow from "./UserRow";
const AllIssuesDashboard = () => {
  const modelRef = useRef();
  const [editIssue, setEditIssue] = useState(null);
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  //   console.log(issues);
  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-app-border overflow-hidden">
        <div className="px-6 py-5 border-b border-app-border">
          <h2 className="text-xl font-semibold text-zinc-900">All Users : ({users.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="relative w-full text-left text-sm whitespace-nowrap">
            {/* head */}
            <thead className="bg-app-cream/50 text-zinc-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-5 py-4">User</th>
                <th className="px-3 py-4">Role</th>
                <th className="px-3 py-4">Created Time</th>
                <th className="px-3 py-4">Status</th>
                <th className="px-3 py-4">Plan Type</th>
                <th className="px-3 py-4">Subscription</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border">
              {users.map((user) => (
                <UserRow
                  setEditIssue={setEditIssue}
                  key={user._id}
                  user={user}
                  modelRef={modelRef}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>

          {editIssue && (
            <IssueEdit
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

export default AllIssuesDashboard;
