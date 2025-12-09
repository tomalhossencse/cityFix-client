import React, { useContext } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthContext";
import Loading from "../../Components/Loading/Loading";
import IssueRow from "./IssueRow";

const MyIssues = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const {
    data: issues = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues?email=${user?.email}`);
      return res.data;
    },
  });
  if (isLoading) {
    <Loading />;
  }
  //   console.log(issues);
  return (
    <>
      <div className="p-8 bg-base-100 m-8 rounded-xl">
        <div>
          <div className="flex px-4 section-title">My Issues</div>
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
                <IssueRow
                  key={issue._id}
                  issue={issue}
                  index={index}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyIssues;
