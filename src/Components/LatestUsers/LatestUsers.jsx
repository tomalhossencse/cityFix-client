import React from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import { DateFormat } from "../../Utility/FormateDate";
const LatestUsers = () => {
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

  console.log(payments);
  return (
    <>
      <div className="p-8 bg-base-100 m-8 rounded-xl">
        <div>
          <div className="flex px-4 section-title">Latest Payments</div>
        </div>
        <div className="overflow-x-auto">
          <table className="table border-2 border-base-200 table-zebra">
            {/* head */}
            <thead className="bg-base-200">
              <tr>
                <th></th>
                <th>Issue Title</th>
                <th>Tnx / Tracking Id</th>
                <th>Paid Time</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments.slice(0, 4).map((pay, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="flex items-center justify-start gap-4">
                    <img
                      src={pay?.custormer_photo}
                      className="w-16 rounded-md"
                      alt=""
                    />
                    <div>
                      <p className="font-semibold text-[16px]">
                        {pay.issueTitle}
                      </p>
                      <p className="font-semibold text-primary">
                        {pay?.customer_name}
                      </p>
                    </div>
                  </td>
                  <td>
                    <p className="text-xs">{pay?.transactionId}</p>
                    <p>{pay?.trackingId}</p>
                  </td>
                  <td>{DateFormat(pay?.paidAt)}</td>
                  <td>
                    <button className="btn-small-red">
                      {pay?.paymentStatus}
                    </button>
                  </td>
                  <td className="text-lg font-semibold">{pay?.amount} BDT</td>
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
