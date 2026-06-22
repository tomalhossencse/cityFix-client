import React from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import { DateFormat } from "../../Utility/FormateDate";
const LatestPayments = () => {
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/latestPayments`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  //   console.log(payments);
  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-app-border overflow-hidden">
        <div>
          <div className="px-6 py-5 border-b border-app-border">
            <h2 className="text-xl font-semibold text-zinc-900">Latest Payments</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            {/* head */}
            <thead className="bg-app-cream/50 text-zinc-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Transaction Id</th>
                <th className="px-6 py-4">Paid Time</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border">
              {payments.map((pay, index) => (
                <tr key={index}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={pay?.custormer_photo} className="size-12 rounded-lg object-cover" alt='photo' />
                      <div className="max-w-40 truncate">
                        <p className="font-semibold text-zinc-900 truncate"> {pay?.issueTitle || pay?.customer_name}</p>
                        <p className="text-xs text-zinc-500">
                          {pay?.customer_email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-xm text-app-text-light">{pay?.transactionId}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-app-text-light">{DateFormat(pay?.paidAt)}</p>
                  </td>
                  <td className="px-5 py-4">
                    <button className="text-xs uppercase font-semibold px-2.5 py-0.5 rounded-xl text-app-success bg-app-success/10">
                      {pay?.paymentStatus}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-zinc-900">{pay?.amount}</p>
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

export default LatestPayments;
