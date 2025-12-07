import React from "react";
import Container from "../../Utility/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import IssueCard from "./IssueCard";

const Allissues = () => {
  const axiosSecure = useAxiosSecure();
  const { data: issues = [] } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues");
      return res.data;
    },
  });
  // console.log(issues);
  return (
    <Container className="mt-24 min-h-screen px-6">
      <div className="section-title">All Public Issues</div>

      <div className="grid gap-4 mb-6 md:flex  grid-cols-3 md:mt-8  justify-center items-center">
        <p className="text-2xl text-primary font-semibold flex-1 col-span-3">
          Doners found : ({issues.length})
        </p>

        {/* age Search */}

        {/* <label className="input w-[120px]">
          <FaSearch />
          <input type="number" placeholder="Min Age" {...register("minAge")} />
        </label> */}

        {/* <label className="input w-[120px]">
          <FaSearch />
          <input type="number" placeholder="Max Age" {...register("maxAge")} />
        </label> */}

        {/* Region Filter */}
        {/* <select
          className="select select-bordered w-[120px] md:w-[180px]"
          {...register("region")}
          defaultValue={""}
        >
          <option value={""}>All Region</option>
          {bloodData.map((region, index) => (
            <option key={index}>{region}</option>
          ))}
        </select> */}

        {/* District Filter */}

        {/* <select
          defaultValue={""}
          className="select select-bordered md:w-[180px] md:col-span-2"
          // disabled={!selectedRegion}
          {...register("district")}
        > */}
        {/* <option value={""}>All District</option>
          {selectedRegion &&
            districtByRegion(selectedRegion).map((district, index) => (
              <option value={district} key={index}>
                {district}
              </option>
            ))}
        </select> */}

        {/* Blood Group Filter */}
        {/* <select
          className="select select-bordered w-[120px]"
          {...register("bloodGroup")}
          defaultValue=""
        >
          <option value="">All BG</option>
          {bloodGroups.map((bg, index) => (
            <option key={index} value={bg}>
              {bg}
            </option>
          ))}
        </select> */}
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
