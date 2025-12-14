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
      <div className="p-8 bg-base-100 m-8 rounded-xl">
        <div>
          <div className="flex px-4 section-title">
            All Users : ({users.length})
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table border-2 border-base-200 table-zebra">
            {/* head */}
            <thead className="bg-base-200">
              <tr>
                <th></th>
                <th>User</th>
                <th>Role</th>
                <th>Created Time</th>
                <th>Status</th>
                <th>Plan Type</th>
                <th>Subscription Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <UserRow
                  setEditIssue={setEditIssue}
                  key={user._id}
                  user={user}
                  index={index}
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
