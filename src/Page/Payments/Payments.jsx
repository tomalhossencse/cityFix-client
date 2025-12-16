import React from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import { DateFormat } from "../../Utility/FormateDate";
import { useForm } from "react-hook-form";
import { CapitalizeFirstLetter } from "../../Utility/CapitalizeFirstLetter";
const Payments = () => {
  const purposeCollections = ["issue", "profile"];
  const axiosSecure = useAxiosSecure();
  const { register, watch } = useForm();
  const purpose = watch("purpose");

  const { data: payments = [], isLoading } = useQuery({
    queryKey: [`payments`, purpose],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?purpose=${purpose}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  //   console.log(payments);
  return (
    <>
      <div className="p-8 bg-base-100 m-8 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex px-4 section-title">
            All Payments : {payments?.length}
          </div>
          <div>
            <select
              className="select select-bordered w-[120px] md:w-[180px]"
              {...register("purpose")}
              defaultValue={""}
            >
              <option value={""}>All</option>
              {purposeCollections.map((status, index) => (
                <option key={index}>{status}</option>
              ))}
            </select>
          </div>
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
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="flex items-center justify-start gap-4   ">
                    <img
                      src={pay?.custormer_photo}
                      className="w-16 rounded-md"
                      alt=""
                    />
                    <div>
                      <p className="font-semibold text-[16px]">
                        {pay.issueTitle || pay?.customer_name}
                      </p>
                      <p className="font-semibold text-primary">
                        {pay?.customer_email}
                      </p>
                    </div>
                  </td>
                  <td>
                    <p className="text-xs">{pay?.transactionId}</p>
                  </td>
                  <td>{DateFormat(pay?.paidAt)}</td>
                  <td>
                    <button className="btn-small-red">
                      {pay?.paymentStatus}
                    </button>
                  </td>
                  <td className="text-lg font-semibold   ">
                    {pay?.amount} BDT
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

export default Payments;
