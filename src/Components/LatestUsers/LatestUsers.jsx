import React from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import { DateFormat } from "../../Utility/FormateDate";
import { CapitalizeFirstLetter } from "../../Utility/CapitalizeFirstLetter";
const LatestUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/latestUsers`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-app-border overflow-hidden">
        <div>
          <div className="px-6 py-5 border-b border-app-border">
            <h2 className="text-xl font-semibold text-zinc-900">Latest Users</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            {/* head */}
            <thead className="bg-app-cream/50 text-zinc-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Create Time</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Plan </th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border">
              {users.slice(0, 4).map((user, index) => (
                <tr key={index}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={user?.photoURL} className="size-12 rounded-lg object-cover" alt='photo' />
                      <div className="max-w-40 truncate">
                        <p className="font-semibold text-zinc-900 truncate"> {user?.displayName}</p>
                        <p className="text-xs text-zinc-500">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-sm text-app-text-light">{DateFormat(user?.createdAt)}</p>
                  </td>
                  <td className="text-md text-primary">
                    <p className="font-semibold text-zinc-900">{CapitalizeFirstLetter(user?.role)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-zinc-900">{CapitalizeFirstLetter(user?.planType)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-zinc-900">
                      {CapitalizeFirstLetter(user?.accountStatus)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LatestUsers;
