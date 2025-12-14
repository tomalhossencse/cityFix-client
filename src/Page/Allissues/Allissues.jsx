import React, { useState } from "react";
import Container from "../../Utility/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import IssueCard from "./IssueCard";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import Loading from "../../Components/Loading/Loading";

const Allissues = () => {
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
  const priorityCollection = ["normal", "high"];
  const axiosSecure = useAxiosSecure();
  const { register, watch } = useForm();

  const status = watch("status");
  const priority = watch("priority");
  const category = watch("category");

  const { data: issues = [] } = useQuery({
    queryKey: [`issues`, status, priority, searchText, category],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/issues?status=${status}&priority=${priority}&category=${category}&search=${searchText}`
      );
      return res.data;
    },
  });

  return (
    <Container className="mt-24 min-h-screen px-6">
      <div className="section-title">All Public Issues</div>

      <div className="grid gap-4 mb-6 md:flex  grid-cols-3 md:mt-8  justify-center items-center">
        <p className="text-2xl text-primary font-semibold flex-1 col-span-3">
          Issues found : ({issues.length})
        </p>

        {/* search */}
        <label className="input w-[120px]">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-0 p-4 my-12">
        {" "}
        {issues.map((issue) => (
          <IssueCard issue={issue} key={issue._id} />
        ))}
      </div>
    </Container>
  );
};

export default Allissues;
