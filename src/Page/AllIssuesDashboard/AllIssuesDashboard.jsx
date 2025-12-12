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
  const assignModelRef = useRef();
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
    queryKey: ["sttafs-filter", selectedIssue?.district, "available"],
    enabled: !!selectedIssue,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/sttafs-filter?district=${selectedIssue?.district}&workStatus=available`
      );
      return res.data;
    },
  });
  if (isLoading) {
    <Loading />;
  }

  const handleAssignSttaf = async (staff) => {
    console.log(staff);
    try {
      const staffInfo = {
        workStatus: "unavailable",
      };
      console.log(staffInfo);
      await axiosSecure.patch(`/sttafs/${staff._id}/workStatus`, staffInfo);
      const { number, email, photo, _id, sttafName } = staff;
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
      console.log(updateData);

      const res = await axiosSecure.patch(
        `/issues/${selectedIssue._id}/timeline`,
        updateData
      );

      if (res.data.modifiedCount) {
        refetch();
        assignModelRef.current.close();
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

  // const handleReject = async (issue) => {
  //   // console.log(staff);
  //   try {
  //     const updateData = {
  //       status: "rejected",
  //       message: `Admin Reject this issue`,
  //       role: "admin",
  //     };

  //     const res = await axiosSecure.patch(
  //       `/issues/${issue._id}/timeline`,
  //       updateData
  //     );

  //     if (res.data.modifiedCount) {
  //       refetch();
  //       Swal.fire({
  //         icon: "success",
  //         title: "Issue",
  //         position: "top-left",
  //         timer: 1200,
  //         showConfirmButton: false,
  //       });
  //     }
  //   } catch (error) {}
  // };

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
      <div className="p-8 bg-base-100 m-8 rounded-xl">
        <div>
          <div className="flex px-4 section-title">
            All Issues : ({issues.length})
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table border-2 border-base-200 table-zebra">
            {/* head */}
            <thead className="bg-base-200">
              <tr>
                <th></th>
                <th>Issue Title</th>
                <th>Tracking Id</th>
                <th>Created Time</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue, index) => (
                <IssueRowDashboard
                  handleReject={handleReject}
                  setEditIssue={setEditIssue}
                  assignModelRef={assignModelRef}
                  setSelectedIssue={setSelectedIssue}
                  key={issue._id}
                  issue={issue}
                  selectedIssue={issue}
                  index={index}
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

          <dialog
            ref={assignModelRef}
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <div className="overflow-x-auto">
                <table className="table border-2 border-base-200 table-zebra">
                  {/* head */}
                  <thead className="bg-base-200">
                    <tr>
                      <th>No.</th>
                      <th>Sttaf</th>
                      <th>Address</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
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
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn-small">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </>
  );
};

export default AllIssuesDashboard;
