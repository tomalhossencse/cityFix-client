import React from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "../../../Utility/Container";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import IssueCard from "../../Allissues/IssueCard";
import { Link } from "react-router";
import { ArrowRightIcon } from "lucide-react";

const LatestResolveIssue = () => {
  const axiosSecure = useAxiosSecure();

  const { data: issues = [] } = useQuery({
    queryKey: [`issues`],
    queryFn: async () => {
      const res = await axiosSecure.get(`/latest-issues`);
      return res.data;
    },
  });

  return (

    <section className="pt-18">
      {/* header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold">Latest Posted Issues</h2>
          <p className="text-sm text-app-text-light mt-1">Last reported issues by citizen</p>
        </div>
        <Link to='/all-issues' className='text-sm font-semibold text-app-orange hover:text-app-orange-dark flex items-center gap-1 transition-colors'>View All<ArrowRightIcon className='size-3' /> </Link>
      </div>
      {/* product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5  gap-4 xl:gap-8">
        {issues.map((issue) => (
          <IssueCard issue={issue} key={issue._id} />
        ))}
      </div>
    </section>

  );
};

export default LatestResolveIssue;
