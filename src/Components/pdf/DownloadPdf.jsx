import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { DateFormat } from "../../Utility/FormateDate";
import { Download } from "lucide-react";

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
        className="flex items-center gap-2 px-4 py-2 bg-app-green text-white rounded-xl hover:bg-green-950 transition-colors font-medium text-sm"
      >
        <Download className="size-4" />  Report
      </button>
    </div>
  );
};

export default DownlaodPdf;
