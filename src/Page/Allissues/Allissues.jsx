import React, { useState } from "react";
import Container from "../../Utility/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import IssueCard from "./IssueCard";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import Loading from "../../Components/Loading/Loading";
import { categoriesData, priorityCollection, statusCollection } from "../../assets/assets";
import { Link } from "react-router";
import { ChevronDown, SearchIcon } from "lucide-react";

// --- Pagination Constants ---
const ISSUES_PER_PAGE = 12;

const Allissues = () => {
  // const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1); //  state for current page
  const [totalPages, setTotalPages] = useState(0); //  state for total pages


  const axiosSecure = useAxiosSecure();
  const { register, watch, reset } = useForm();

  const status = watch("status");
  const priority = watch("priority");
  const category = watch("category");
  const search = watch("search");

  const ClearFilters = () => {
    reset({
      status: "",
      priority: "",
      category: "",
      search: ""
    });
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [status, priority, search, category]);

  const {
    data: issuesData = { issues: [], total: 0 },
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`issues`, status, priority, search, category, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/issues?status=${status}&priority=${priority}&category=${category}&search=${search}&page=${currentPage}&limit=${ISSUES_PER_PAGE}`
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
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">


        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">

          {/* Title */}
          <div className="w-full md:flex-1">
            <h1 className="text-2xl font-semibold text-app-green">
              All Public Issues
            </h1>
            <p className="text-sm text-app-text-light mt-0.5">
              {totalIssues} issues found
            </p>
          </div>

          {/* Search */}
          <label className=" sm:flex flex-1  max-w-xl text-xs sm:text-sm relative">
            <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />

            <input
              type="text"
              placeholder="Search Issues"
              className="w-full pl-8 p-2 bg-orange-50 rounded-full ring ring-app-orange/15 focus:ring-app-orange/30"
              {...register("search")}
            // onChange={(e) => setSearchText(e.target.value)}
            />
          </label>

          {/* Right side controls */}
          <div className="w-full md:flex-2 flex flex-col md:flex-row md:items-center gap-3">

            {/* Filters */}
            <div className="w-full flex flex-wrap gap-2 md:flex-nowrap md:justify-end">

              {/* Status */}
              <div className="relative w-full sm:w-auto">
                <select
                  className="appearance-none w-full sm:w-40 pl-3 pr-8 py-2 text-sm bg-white rounded-xl border border-app-border focus:border-app-green outline-none cursor-pointer"
                  {...register("status")}
                  defaultValue={""}
                >
                  <option value={""}>All (Status)</option>
                  {statusCollection.map((status, index) => (
                    <option key={index}>{status}</option>
                  ))}
                </select>

                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-app-text-light pointer-events-none" />
              </div>

              {/* Priority */}
              <div className="relative w-full sm:w-auto">
                <select
                  className="appearance-none w-full sm:w-40 pl-3 pr-8 py-2 text-sm bg-white rounded-xl border border-app-border focus:border-app-green outline-none cursor-pointer"
                  {...register("priority")}
                  defaultValue={""}
                >
                  <option value={""}>All (Priority)</option>
                  {priorityCollection.map((priority, index) => (
                    <option key={index}>{priority}</option>
                  ))}
                </select>

                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-app-text-light pointer-events-none" />
              </div>

              {/* Category */}
              <div className="relative w-full sm:w-auto">
                <select
                  className="appearance-none w-full sm:w-40 pl-3 pr-8 py-2 text-sm bg-white rounded-xl border border-app-border focus:border-app-green outline-none cursor-pointer"
                  {...register("category")}
                  defaultValue={""}
                >
                  <option value={""}>All (Category)</option>
                  {categoriesData.map((cat, index) => (
                    <option key={index}>{cat.title}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-app-text-light pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* --- Issues Display --- */}
        {isLoading ? (
          <Loading />
        ) : issues.length === 0 ? (
          <div className="text-center py-18">
            <p className="text-lg font-semibold text-app-green mb-2">
              No issues found
            </p>
            <p className="text-sm text-app-text-light mb-4">
              No issues found matching your criteria.
            </p>
            <button
              onClick={ClearFilters}
              className="px-5 py-2 text-sm font-medium bg-app-green text-white rounded-xl hover:bg-app-green-light transition-colors"
            >
              Clear Filters
            </button>
          </div>

        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-8">
            {issues.map((issue) => (
              <IssueCard issue={issue} key={issue._id} />
            ))}


          </div>
        )}


        {/* --- Pagination UI --- */}
        {totalPages > 1 && (
          <div className="flex-center gap-2 mt-16">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`size-9 rounded-lg text-sm font-medium transition-colors ${currentPage === index + 1 ? "bg-app-orange text-white" : "bg-white text-app-text-light hover:bg-app-cream"
                  }`}
                onClick={() => { handlePageChange(index + 1); scrollTo(0, 0) }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}

      </div>

    </div >
  );
};

export default Allissues;
