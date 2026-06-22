import React from "react";
import { DateFormat } from "../../Utility/FormateDate";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { EditIcon, XIcon } from "lucide-react";
import { Link } from "react-router";
const SttafsRow = ({ sttaf, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const { email, photo, sttafName, district, region, createdAt, _id } = sttaf;

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/sttafs/${_id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            // navigate("/all-issues");
            Swal.fire({
              position: "top-right",
              title: "Deleted!",
              icon: "success",
              text: "Your Sttafs has been deleted.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };
  return (
    <tr className="hover:bg-zinc-50/50 transition-colors">
      <td
        className="px-5 py-4"
      >
        <div className="flex items-center gap-3">
          <img src={photo} className="size-12 rounded-lg object-cover" alt={sttafName} />
          <div>
            <p className="font-semibold text-zinc-900 max-w-32 truncate">{sttafName}</p>
            <p className="text-xs text-zinc-500">
              {email}
            </p>
          </div>

        </div>

      </td>

      <td className="px-5 py-4 text-sm text-zinc-500">
        {district}, {region}
      </td>
      <td className="px-5 py-4 text-sm text-zinc-500">{DateFormat(createdAt)}</td>

      <td className="px-5 py-4">
        <div className="flex items-center justify-start gap-2">
          <button
            onClick={handleDelete}
            className="p-2 text-zinc-500 hover:text-app-orange bg-zinc-100 hover:bg-zinc-50 rounded-lg transition-colors"
          >
            <XIcon className="size-4" />

          </button>
          <Link
            to={`/dashboard/staffs/${_id}/edit`}
            className="p-2 text-zinc-500 hover:text-app-orange bg-zinc-100 hover:bg-zinc-50 rounded-lg transition-colors"
          >
            <EditIcon className="size-4" />

          </Link>
        </div>
      </td>
    </tr>
  );
};

export default SttafsRow;
