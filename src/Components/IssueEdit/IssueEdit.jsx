import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";

const IssueEdit = ({
  issue,
  modelRef,
  refetch,
  loading: issueLoading,
  setEditIssue,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (issue) {
      reset(issue);
      modelRef.current?.showModal();
    }
  }, [issue, reset, modelRef]);

  const { data: locations = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => (await axiosSecure.get("/districtbyRegion")).data,
  });

  const regions = [...new Set(locations.map((item) => item.region))];
  const selectedRegion = watch("region");

  const filteredDistricts = locations
    .filter((loc) => loc.region === selectedRegion)
    .map((loc) => loc.district);

  const issueCategories = [
    "Road & Potholes",
    "Streetlights",
    "Water Leakage",
    "Garbage & Waste",
    "Drainage",
    "Footpath & Sidewalk",
    "Electricity",
    "Public Safety",
    "Traffic Signal",
    "Other",
  ];

  const handleUpdateIssue = async (data) => {
    try {
      const userRes = await axiosSecure.get(`/users/${user?.email}`);
      if (userRes.data?.accountStatus === "blocked") {
        modelRef.current.close();
        return toast.error("Account is Blocked by Admin");
      }

      const res = await axiosSecure.patch(`/issues/${issue._id}`, data);
      if (res.data.modifiedCount) {
        modelRef.current.close();
        setEditIssue(null);
        refetch();
        Swal.fire({
          icon: "success",
          title: "Issue Updated Successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      toast.error(error || "Failed to update issue");
    }
  };

  if (loading || issueLoading) {
    return <Loading />;
  }
  return (
    <dialog ref={modelRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg text-primary mb-4">
          Edit Public Issue
        </h3>
        <div className="divider"></div>
        <form onSubmit={handleSubmit(handleUpdateIssue)} className="">
          {/* divider */}
          <div>
            {/* name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <legend className="fieldset-legend">Issue Title</legend>
                <input
                  type="text"
                  className="input w-full md:input-md input-sm"
                  placeholder="Issue Title"
                  {...register("issueTitle", { required: true })}
                />
                {errors.issueTitle?.type === "required" && (
                  <p className="text-red-500 py-2">Issue Title Required!</p>
                )}
              </div>
              <div className="">
                <legend className="fieldset-legend"> Photo Url</legend>
                <input
                  type="text"
                  className="input w-full md:input-md input-sm"
                  placeholder="Issue photo url"
                  {...register("photo", { required: true })}
                />
                {errors.photo?.type === "required" && (
                  <p className="text-red-500 py-2">Issue Photo url Required!</p>
                )}
              </div>
              {/* email */}
              <div>
                <legend className="fieldset-legend">Email</legend>
                <input
                  type="email"
                  className="input w-full md:input-md input-sm"
                  placeholder="Email"
                  readOnly
                  {...register("email", { required: true })}
                />
              </div>
              {/* category */}
              <div>
                <legend className="fieldset-legend">Category</legend>
                <select
                  key={issue?._id}
                  className="select w-full md:select-md select-sm"
                  {...register("category", { required: true })}
                >
                  <option value={""} disabled>
                    Select a category
                  </option>
                  {issueCategories.map((cat, index) => (
                    <option value={cat} key={index}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category?.type === "required" && (
                  <p className="text-red-500 py-2">Issues Category Required!</p>
                )}
              </div>
              {/* contact */}
              <div>
                <legend className="fieldset-legend">Contact No</legend>
                <input
                  type="text"
                  className="input w-full md:input-md input-sm"
                  placeholder="Contact No."
                  {...register("number", { required: true })}
                />
                {errors.number?.type === "required" && (
                  <p className="text-red-500 py-2">Contact No. Required!</p>
                )}
              </div>
              {/* Name */}
              <div>
                <legend className="fieldset-legend">User Name</legend>
                <input
                  type="text"
                  className="input w-full md:input-md input-sm"
                  placeholder="Your Name"
                  readOnly
                  {...register("displayName", { required: true })}
                />
                {errors.displayName?.type === "required" && (
                  <p className="text-red-500 py-2">User Name Required!</p>
                )}
              </div>
              {/* region */}
              <div>
                <legend className="fieldset-legend">Your Region</legend>
                <select
                  className="select w-full md:select-md select-sm"
                  {...register("region", { required: true })}
                >
                  <option value={""} disabled>
                    Select Region
                  </option>
                  {regions.map((region, index) => (
                    <option key={index}>{region}</option>
                  ))}
                </select>
                {errors.region?.type === "required" && (
                  <p className="text-red-500 py-2">Region Required!</p>
                )}
              </div>
              {/* district */}
              <div>
                <legend className="fieldset-legend">District</legend>
                <select
                  className="select w-full md:select-md select-sm"
                  {...register("district", { required: true })}
                >
                  <option value={""} disabled>
                    Select District
                  </option>
                  {filteredDistricts.map((district, index) => (
                    <option value={district} key={index}>
                      {district}
                    </option>
                  ))}
                </select>
                {errors.district?.type === "required" && (
                  <p className="text-red-500 py-2">District Required!</p>
                )}
              </div>
              {/* area */}
              <div className="col-span-2">
                <legend className="fieldset-legend">Area</legend>
                <input
                  type="text"
                  className="input w-full md:input-md input-sm"
                  placeholder="Your Area"
                  {...register("area", { required: true })}
                />
              </div>
              {errors.area?.type === "required" && (
                <p className="text-red-500 py-2">Area Required!</p>
              )}
              {/* addional information */}
              <div className="col-span-2">
                <legend className="fieldset-legend">
                  Additional Information
                </legend>
                <input
                  type="text"
                  className="input w-full md:input-md input-sm p-2"
                  placeholder="Your Additional Information"
                  {...register("information", { required: true })}
                />

                {errors.information?.type === "required" && (
                  <p className="text-red-500 py-2">
                    Additional Information Required!
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="modal-action md:col-span-2">
            <button
              type="button"
              onClick={() => {
                setEditIssue(null);
                modelRef.current.close();
              }}
              className="btn btn-sm"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-primary">
              Update Issue
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default IssueEdit;
