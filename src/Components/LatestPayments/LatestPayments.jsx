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
      <div className="md:p-8 bg-base-100 md:m-8 rounded-xl">
        <div>
          <div className="flex px-4 section-title">Latest Payments</div>
        </div>
        <div className="overflow-x-auto">
          <table className="table border-2 border-base-200 table-zebra">
            {/* head */}
            <thead className="bg-base-200">
              <tr>
                <th></th>
                <th>Title</th>
                <th>Transaction Id</th>
                <th>Paid Time</th>
                <th>Status</th>
                <th>Amount(BDT)</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td>
                    <div className="flex items-center gap-3 min-w-[250px]">
                      <div className="avatar">
                        <div className="mask mask-squircle h-10 w-10">
                          <img
                            src={pay?.custormer_photo}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">
                          {pay?.issueTitle || pay?.customer_name}
                        </div>
                        <p className="font-semibold text-primary">
                          {pay?.customer_email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p>{pay?.transactionId}</p>
                  </td>
                  <td className="whitespace-nowrap">
                    {DateFormat(pay?.paidAt)}
                  </td>
                  <td>
                    <button className="btn-small-red">
                      {pay?.paymentStatus}
                    </button>
                  </td>
                  <td className="   text-lg font-semibold">{pay?.amount}</td>
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
