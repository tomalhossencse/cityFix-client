import React from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import { DateFormat } from "../../Utility/FormateDate";
import { useForm } from "react-hook-form";
import DownlaodPdf from "../../Components/pdf/DownloadPdf";
import { ChevronDown, Download } from "lucide-react";
const Payments = () => {
  const purposeCollections = ["issue", "profile"];
  const axiosSecure = useAxiosSecure();
  const { register, watch } = useForm();
  const purpose = watch("purpose", "");

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

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-app-border overflow-hidden">
        <div className="px-6 py-5 border-b border-app-border flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-xl font-semibold text-zinc-900">All Payments : {payments?.length}</h2>

          {/* Status */}
          <div className="relative w-full sm:w-auto">
            <select
              className="appearance-none w-full sm:w-40 pl-3 pr-8 py-2 text-sm bg-white rounded-xl border border-app-border focus:border-app-green outline-none cursor-pointer"
              {...register("purpose")}
              defaultValue={""}
            >
              <option value={""}>All</option>
              {purposeCollections.map((purpose, index) => (
                <option key={index}>{purpose}</option>
              ))}
            </select>

            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-app-text-light pointer-events-none" />
          </div>

          <DownlaodPdf payments={payments} />

        </div>

        <div className="overflow-x-auto">
          <table className="relative w-full text-left text-sm whitespace-nowrap">
            {/* head */}
            <thead className="bg-app-cream/50 text-zinc-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">TnxId / Paid</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border">
              {payments.length === 0 ? (<tr>
                <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">
                  No payments found.
                </td>
              </tr>) : (payments.map((pay) => (
                <tr key={pay._id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">

                      <img src={pay?.custormer_photo} className="size-12 rounded-lg object-cover" alt={pay.issueTitle || pay?.customer_name} />

                      <div>
                        <p className="font-semibold text-zinc-900 max-w-36 truncate"> {pay.issueTitle || pay?.customer_name}</p>
                        <p className="text-xs text-zinc-500">
                          {pay?.customer_email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold text-zinc-900">{pay?.transactionId}</p>
                      <p className="text-sm text-zinc-500">
                        {DateFormat(pay?.paidAt)}
                      </p>

                    </div>
                  </td>

                  <td className="px-5 py-4">

                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-xl uppercase ${pay?.paymentStatus === "paid" ? "text-app-success bg-app-success/10" : "text-app-error bg-app-error/10"
                      }`}>{pay?.paymentStatus}</span>

                  </td>

                  <td className="px-5 py-4 font-medium text-zinc-900">
                    {pay?.amount} BDT
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
};

export default Payments;
