import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { DateFormat } from "../../Utility/FormateDate";

const DownlaodPdf = ({ payments }) => {
  const downlaodReport = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    const columns = [
      "No.",
      "Name",
      "Email",
      "Transaction Id",
      "Paid Time",
      "Status",
      "Amount($)",
    ];
    const rows = payments.map((pay, index) => [
      index + 1,
      pay.customer_name,
      pay.customer_email,
      pay.transactionId,
      DateFormat(pay.paidAt),
      pay.paymentStatus,
      pay.amount,
    ]);
    autoTable(doc, { head: [columns], body: rows });
    doc.save("All-Payments.pdf");
  };
  return (
    <div>
      <button
        onClick={downlaodReport}
        className="btn w-full bg-primary text-white font-bold text-md rounded-md shadow-md hover:bg-accent transition-transform hover:scale-105 mt-4 col-span-2"
      >
        Download report
      </button>
    </div>
  );
};

export default DownlaodPdf;
