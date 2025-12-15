import React, { useContext } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Context/AuthContext";
import Loading from "../../../Components/Loading/Loading";
import Container from "../../../Utility/Container";

const CommunityStats = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["dashboard", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/adminDashboard/stats`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mt-24 mb-6 bg-accent-content">
      <Container className="flex flex-wrap items-center justify-start gap-10 p-12">
        <div className="space-y-2">
          <h1 className="text-xl md:text-3xl font-medium text-accent">
            Assisting Communities for <br />
            <span className="text-primary">a Better Tomorrow</span>
          </h1>
          <p className="text-sm md:text-md text-accent">
            Working on projects that improve living standards.Building a
            brighter future for everyone.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-2 md:gap-10 gap-4 bg-accent-content">
          <div className="flex justify-center items-center gap-2">
            <div>
              <img
                className="w-10"
                src="https://img.icons8.com/arcade/64/group.png"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-between items-center">
              <h3 className="text-3xl font-semibold text-primary">
                {stats?.issues?.total}
              </h3>
              <p className="text-xs text-accent font-semibold">Total Users</p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2">
            <div>
              <img
                className="w-10"
                src="https://img.icons8.com/color/48/clock--v1.png"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-between items-center">
              <h3 className="text-3xl font-semibold text-primary">
                {stats?.issues?.pending}
              </h3>
              <p className="text-xs text-accent font-semibold">
                Pending Issues
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <div>
              <img
                src="https://img.icons8.com/flat-round/64/checkmark.png"
                className="w-10"
              />
            </div>
            <div className="flex flex-col justify-between items-center">
              <h3 className="text-3xl font-semibold text-primary">
                {stats?.issues?.resloved}
              </h3>
              <p className="text-xs text-accent font-semibold">
                Resoved Issues
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <div>
              <img
                className="w-9"
                src="https://img.icons8.com/external-sbts2018-outline-color-sbts2018/58/external-issue-basic-ui-elements-2.5-sbts2018-outline-color-sbts2018.png"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-between items-center">
              <h3 className="text-3xl font-semibold text-primary">
                {stats?.issues?.total}
              </h3>
              <p className="text-xs text-accent font-semibold">Total Issues</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CommunityStats;
