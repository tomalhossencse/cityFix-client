import React, { useRef, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import AddSttaffModel from "../../Components/AddSttaffModel/AddSttaffModel";
import SttafsRow from "./SttafsRow";
import UpdateStaffModel from "../../Components/AddSttaffModel/UpdateStaffModel";

const ManageStaffs = () => {
  const [editSttaf, setEditStaff] = useState(null);
  const modelRef = useRef();
  const modelUpdateRef = useRef();
  const axiosSecure = useAxiosSecure();
  const {
    data: sttafs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sttafs"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sttafs`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="p-8 bg-base-100 m-8 rounded-xl">
        <div className="flex items-start justify-between">
          <div className="flex px-4 section-title">
            Manage Sttafs : ({sttafs.length})
          </div>
          <button
            className="btn-outline"
            onClick={() => modelRef.current.showModal()}
          >
            Add Sttaf
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table border-2 border-base-200 table-zebra">
            {/* head */}
            <thead className="bg-base-200">
              <tr>
                <th></th>
                <th>Sttaf Name</th>
                <th>Address</th>
                <th>Created Time</th>
                {/* <th>Status</th> */}
                {/* <th>Priority</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sttafs.map((sttaf, index) => (
                <SttafsRow
                  key={sttaf._id}
                  setEditStaff={setEditStaff}
                  sttaf={sttaf}
                  index={index}
                  modelRef={modelRef}
                  modelUpdateRef={modelUpdateRef}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
          <AddSttaffModel refetch={refetch} modelRef={modelRef} />
          {editSttaf && (
            <UpdateStaffModel
              modelUpdateRef={modelUpdateRef}
              sttaf={editSttaf}
              refetch={refetch}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ManageStaffs;
