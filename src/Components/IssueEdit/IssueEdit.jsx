import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";

const IssueEdit = ({ issue, modelRef, refetch, loading: issueLoading }) => {
  useEffect(() => {
    if (issue && modelRef?.current) {
      modelRef.current.showModal();
    }
  }, [issue, modelRef]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (issue) {
      reset(
        {
          issueTitle: issue.issueTitle,
          photo: issue.photo,
          email: issue.email,
          category: issue.category,
          number: issue.number,
          displayName: issue.displayName,
          region: issue.region,
          district: issue.district,
          area: issue.area,
          information: issue.information,
        },
        {
          keepDirty: false,
          keepTouched: false,
        }
      );
    }
  }, [issue, reset]);

  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const { data: locations = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/districtbyRegion");
      return res.data;
    },
  });

  const { data: userDetails } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

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
  const dublicateRegion = locations.map((data) => data.region);
  const regions = [...new Set(dublicateRegion)];

  const districtByRegion = (data) => {
    const districtsByRegion = locations.filter((dist) => dist.region === data);
    const districts = districtsByRegion.map((d) => d.district);
    return districts;
  };
  const region = watch("region");

  const handleUpdateIssue = (data) => {
    if (userDetails?.accountStatus === "blocked") {
      modelRef.current.close();
      return toast.error("Account is Blocked By Admin");
    }
    // console.log(data);
    axiosSecure.patch(`/issues/${issue._id}`, data).then((res) => {
      if (res.data.modifiedCount) {
        modelRef.current.close();
        refetch();
        Swal.fire({
          position: "top-right",
          icon: "success",
          title: "Report Issue Upadated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  if (loading || issueLoading) {
    return <Loading />;
  }
  return (
    <dialog
      ref={modelRef}
      id="my_modal_5"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <form
          onSubmit={handleSubmit(handleUpdateIssue)}
          className="bg-accent-content md:py-6 py-2 md:px-6 px-4 rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transform transition duration-1000 ease-in-out hover:bg-base-200 hover:-translate-y-1"
        >
          <fieldset className="fieldset">
            <h1 className="font-black text-xl md:text-2xl text-primary">
              Edit Public Issue
            </h1>

            {/* divider */}
            <div className="divider"></div>

            <>
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
                      <p className="text-red-500 py-2">
                        Issue Photo url Required!
                      </p>
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
                      <p className="text-red-500 py-2">
                        Issues Category Required!
                      </p>
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
                      {region &&
                        districtByRegion(region).map((district, index) => (
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

                {/* button */}

                <button type="submit" className="mt-4 btn-small-full">
                  Submit
                </button>
              </div>
            </>
          </fieldset>
        </form>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn-small">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default IssueEdit;
