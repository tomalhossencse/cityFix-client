import React from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import AddSttaffModel from "../../Components/AddSttaffModel/AddSttaffModel";
import SttafsRow from "./SttafsRow";
import UpdateStaffModel from "../../Components/AddSttaffModel/UpdateStaffModel";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

const ManageStaffs = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: sttafs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sttafs"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sttafs`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-app-border overflow-hidden">
        <div className="px-6 py-5 border-b border-app-border flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-xl font-semibold text-zinc-900">
            Manage Staffs
          </h2>
          <Link
            to={`/dashboard/staffs/new`}
            className="flex items-center gap-2 px-4 py-2 bg-app-green text-white rounded-xl hover:bg-green-950 transition-colors font-medium text-sm"
          >
            <PlusIcon className="size-4" />Add Staff
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            {/* head */}
            <thead className="bg-app-cream/50 text-zinc-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Sttaf Name</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4">Created Time</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border">
              {sttafs.map((sttaf) => (
                <SttafsRow
                  key={sttaf._id}
                  sttaf={sttaf}
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

export default ManageStaffs;
