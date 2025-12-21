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

  //   console.log(users);
  return (
    <>
      <div className="md:p-8 bg-base-100 md:m-8 rounded-xl">
        <div>
          <div className="flex px-4 section-title">Latest Users</div>
        </div>
        <div className="overflow-x-auto">
          <table className="table border-2 border-base-200 table-zebra">
            {/* head */}
            <thead className="bg-base-200">
              <tr>
                <th></th>
                <th>User</th>
                <th>Create Time</th>
                <th>Role</th>
                <th>Plan </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 4).map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3 min-w-[250px]">
                      <div className="avatar">
                        <div className="mask mask-squircle h-10 w-10">
                          <img src={user?.photoURL} className="object-cover" />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">{user.displayName}</div>
                        <p className="font-semibold text-primary">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    {DateFormat(user?.createdAt)}
                  </td>
                  <td className="text-md text-primary">
                    <p>{CapitalizeFirstLetter(user?.role)}</p>
                  </td>
                  <td>{CapitalizeFirstLetter(user?.planType)}</td>
                  <td>
                    <button className="btn-small-red">
                      {CapitalizeFirstLetter(user?.accountStatus)}
                    </button>
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
