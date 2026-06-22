import React, { useRef, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import IssueEdit from "../../Components/IssueEdit/IssueEdit";
import IssueRowDashboard from "./IssueRowDashboard";
import AssignStaffRow from "./AssignStaffRow";
import Swal from "sweetalert2";
const AllIssuesDashboard = () => {
  const modelRef = useRef();
  const [assignModal, setAssignModal] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [editIssue, setEditIssue] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const axiosSecure = useAxiosSecure();
  const {
    data: issues = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allIssues"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allIssues`);
      return res.data;
    },
  });

  const { data: sttafs = [] } = useQuery({
    queryKey: [
      "sttafs-filter",
      selectedIssue?.district,
      selectedIssue?.category,
      selectedIssue?.region,
    ],
    enabled: !!selectedIssue,
    queryFn: async () => {
      const district = encodeURIComponent(selectedIssue?.district);
      const category = encodeURIComponent(selectedIssue?.category);
      const region = encodeURIComponent(selectedIssue?.region);
      const res = await axiosSecure.get(
        `/sttafs-filter`,
      );
      return res.data;
      //  ?district=${district}&category=${category}&region=${region}
    },
  });
  if (isLoading) {
    return <Loading />;
  }

  const handleAssign = async () => {
    console.log(selectedStaff);
    try {
      const { number, email, photo, _id, sttafName } = selectedStaff;
      const updateData = {
        assignedStaff: {
          staffId: _id,
          staffName: sttafName,
          staffEmail: email,
          staffPhoto: photo,
          sttafContact: number,
          status: "assigned",
        },
        status: "pending",
        message: `Staff : ${sttafName} assigned to this issue`,
        role: "admin",
      };
      // console.log(updateData);

      const res = await axiosSecure.patch(
        `/issues/${selectedIssue._id}/timeline`,
        updateData,
      );

      if (res.data.modifiedCount) {
        refetch();
        setSelectedStaff(null);
        setAssignModal(false);
        Swal.fire({
          icon: "success",
          title: "Issue successfully",
          position: "top-right",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  const handleReject = (issue) => {
    const updateData = {
      status: "rejected",
      message: `Admin Reject this issue`,
      role: "admin",
    };
    Swal.fire({
      title: "Are you sure to Reject?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/issues/${issue._id}/timeline`, updateData)
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                position: "top-right",
                title: "Rejected!",
                icon: "success",
                text: "Issue has been Rejected.",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };
  //   console.log(issues);
  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-app-border overflow-hidden">
        <div>
          <div className="px-6 py-5 border-b border-app-border">
            <h2 className="text-xl font-semibold text-zinc-900">All Issues : ({issues.length})</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="relative w-full text-left text-sm whitespace-nowrap">
            {/* head */}
            <thead className="bg-app-cream/50 text-zinc-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Issue Title</th>
                <th className="px-3 py-4">TnxId / create</th>
                <th className="px-3 py-4">Locations</th>
                <th className="px-3 py-4">Status</th>
                <th className="px-3 py-4">Priority</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border">
              {issues.map((issue) => (
                <IssueRowDashboard
                  handleReject={handleReject}
                  setEditIssue={setEditIssue}
                  setAssignModal={setAssignModal}
                  assignModal={assignModal}
                  setSelectedIssue={setSelectedIssue}
                  key={issue._id}
                  issue={issue}
                  selectedIssue={issue}
                  modelRef={modelRef}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>

          {editIssue && (
            <IssueEdit
              issue={editIssue}
              modelRef={modelRef}
              refetch={refetch}
            />
          )}

          {/* assign model */}
          {
            assignModal &&
            <>
              <div onClick={(e) => { setAssignModal(null); e.stopPropagation() }} className="fixed inset-0 bg-app-cream/80 backdrop-blur z-50" />
              <div className="fixed inset-0 z-50 flex-center p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-sm animate-fade-in">
                  <h3 className="text-lg font-semibold text-app-green mb-4">Assign Delivery Staff</h3>
                  {sttafs.length === 0 ? (
                    <p className="text-sm text-zinc-500 mb-4">No active delivery staffs. Please onboard a staff first.</p>
                  ) : (
                    <div className="space-y-2 mb-5 max-h-60 overflow-y-auto">
                      {sttafs.map((s) => (
                        <label key={s._id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${selectedStaff === s ? "border-app-green bg-app-green/5" : "border-app-border hover:bg-app-cream"}`}>
                          <input type="radio" name="staff" value={s} checked={selectedStaff === s} onChange={() => setSelectedStaff(s)} className="text-app-green" />
                          <div className="size-8 rounded-full bg-app-green flex-center">
                            <span className="text-white text-xs font-semibold">{s.sttafName.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-zinc-900">{s.sttafName}</p>
                            <p className="text-xs text-zinc-500 capitalize">{s.category} • {s.number}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button onClick={() => setAssignModal(null)} className="flex-1 py-2.5 text-sm font-medium text-zinc-600 bg-zinc-100 rounded-xl hover:bg-zinc-200 transition-colors">Cancel</button>
                    <button onClick={handleAssign} disabled={!selectedStaff} className="flex-1 py-2.5 text-sm font-medium text-white bg-app-green rounded-xl hover:bg-app-green-light transition-colors disabled:opacity-50">Assign</button>
                  </div>

                </div>
              </div>
            </>
          }

          {/* <dialog
            ref={assignModelRef}
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <div className="overflow-x-auto">
                <table className="table border-2 border-base-200 table-zebra">

                  <thead className="bg-base-200">
                    <tr>
                      <th>No.</th>
                      <th>Sttaf</th>
                      <th>Address</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-app-border">
                    {sttafs.map((sttaf, index) => (
                      <AssignStaffRow
                        handleAssignSttaf={handleAssignSttaf}
                        key={sttaf._id}
                        sttaf={sttaf}
                        index={index}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="modal-action">
                <form method="dialog">

                  <button className="btn-small">Close</button>
                </form>
              </div>
            </div>
          </dialog> */}
        </div>
      </div>
    </>
  );
};

export default AllIssuesDashboard;
