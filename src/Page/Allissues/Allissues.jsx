import React, { useState } from "react";
import Container from "../../Utility/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import IssueCard from "./IssueCard";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import Loading from "../../Components/Loading/Loading";

// --- Pagination Constants ---
const ISSUES_PER_PAGE = 9; // Define how many issues to show per page

const Allissues = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // New state for current page
  const [totalPages, setTotalPages] = useState(0); // New state for total pages

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
  const axiosSecure = useAxiosSecure();
  const { register, watch } = useForm();

  const status = watch("status");
  const priority = watch("priority");
  const category = watch("category");

  React.useEffect(() => {
    setCurrentPage(1);
  }, [status, priority, searchText, category]);

  const {
    data: issuesData = { issues: [], total: 0 },
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`issues`, status, priority, searchText, category, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/issues?status=${status}&priority=${priority}&category=${category}&search=${searchText}&page=${currentPage}&limit=${ISSUES_PER_PAGE}`
      );
      // Calculate total pages and update state
      const totalIssues = res.data.total;
      setTotalPages(Math.ceil(totalIssues / ISSUES_PER_PAGE));
      return res.data;
    },
  });

  const issues = issuesData.issues;
  const totalIssues = issuesData.total;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isError) return <div>An error occurred while fetching issues.</div>;

  return (
    <Container className="mt-24 min-h-screen px-6">
      <div className="section-title">All Public Issues</div>

      <div className="grid gap-4 mb-6 md:flex grid-cols-3 md:mt-8 justify-center items-center">
        <p className="text-2xl text-primary font-semibold flex-1 col-span-3">
          Issues found : ({totalIssues})
        </p>

        {/* search */}
        <label className="input input-bordered flex items-center gap-2 w-[120px]">
          <FaSearch />
          <input
            type="text"
            placeholder="Search Title"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </label>

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

      {/* --- Issues Display --- */}
      {isLoading ? (
        <Loading />
      ) : issues.length === 0 ? (
        <div className="text-center text-xl my-12 text-gray-500">
          No issues found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-0 p-4 my-12">
          {issues.map((issue) => (
            <IssueCard issue={issue} key={issue._id} />
          ))}
        </div>
      )}
      {/* --- End Issues Display --- */}

      {/* --- Pagination UI --- */}
      {totalPages > 1 && (
        <div className="flex justify-center my-8">
          <div className="join">
            <button
              className="join-item btn"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              «
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`join-item btn ${
                  currentPage === index + 1 ? "btn-active btn-small" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="join-item btn"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              »
            </button>
          </div>
        </div>
      )}
      {/* --- End Pagination UI --- */}
    </Container>
  );
};

export default Allissues;
