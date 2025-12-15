import React from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "../../../Utility/Container";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import IssueCard from "../../Allissues/IssueCard";

const LatestResolveIssue = () => {
  const axiosSecure = useAxiosSecure();

  const { data: issues = [] } = useQuery({
    queryKey: [`issues`],
    queryFn: async () => {
      const res = await axiosSecure.get(`/latestIssues?status=resolved`);
      return res.data;
    },
  });

  return (
    <Container className="mt-12  px-6">
      <div className="section-title">Latest Resolve Issues</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-0 p-4 my-12">
        {issues.map((issue) => (
          <IssueCard issue={issue} key={issue._id} />
        ))}
      </div>
    </Container>
  );
};

export default LatestResolveIssue;
