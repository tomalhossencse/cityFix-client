import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import Container from "../../../Utility/Container";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import IssueCard from "../../Allissues/IssueCard";

const LatestResolveIssue = () => {
  const [searchText, setSearchText] = useState("");
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
