import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Container from "../../Utility/Container";
import { AuthContext } from "../../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useNavigate } from "react-router";
import { GenerateTrackingId } from "../../Utility/GenerateTrackingId";
import Swal from "sweetalert2";

const AddIssue = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { data: locations = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/districtbyRegion");
      //   console.log(res.data);
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
  const region = watch("region");

  const districtByRegion = (data) => {
    const districtsByRegion = locations.filter((dist) => dist.region === data);
    const districts = districtsByRegion.map((d) => d.district);
    return districts;
  };

  const handleAddIssue = (data) => {
    // console.log(data);
    data.createAt = new Date();
    data.trackingId = GenerateTrackingId();
    data.status = "pending";
    data.priority = "normal";
    data.upvoteCount = 0;
    axiosSecure.post("/issues", data).then((res) => {
      if (res.data.insertedId) {
        navigate("/all-issues");
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Report Issue Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <Container className="my-26 px-6">
      <form
        onSubmit={handleSubmit(handleAddIssue)}
        className="bg-accent-content md:py-12 py-6 md:px-16 px-6 rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transform transition duration-1000 ease-in-out hover:bg-base-200 hover:-translate-y-1"
      >
        <fieldset className="fieldset">
          <h1 className="font-black text-2xl md:text-4xl text-primary">
            Report a Public Issue
          </h1>
          <p className="md:w-1/2 py-4">
            Report public infrastructure issues in your area and help
            authorities respond faster, improve transparency, and deliver better
            city services.
          </p>

          {/* divider */}
          <div className="divider"></div>

          <h3 className="font-bold md:text-2xl text-xl mb-2">
            Please fill the following information to report a public issue.
          </h3>
          {/* radio */}

          <div className="md:flex gap-10 items-center justify-between">
            <div className="flex-3">
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
                    defaultValue={user?.email}
                    readOnly
                    {...register("email", { required: true })}
                  />
                </div>
                {/* category */}
                <div>
                  <legend className="fieldset-legend">Category</legend>
                  <select
                    defaultValue={""}
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
                    defaultValue={user?.displayName}
                    readOnly
                    {...register("displayName", { required: true })}
                  />
                  {/* {errors.displayName?.type === "required" && (
                    <p className="text-red-500 py-2">User Name Required!</p>
                  )} */}
                </div>
                {/* region */}
                <div>
                  <legend className="fieldset-legend">Your Region</legend>
                  <select
                    defaultValue={""}
                    className="select w-full md:select-md select-sm"
                    {...register("region", { required: true })}
                  >
                    <option value={""} disabled>
                      Select Your Region
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
                    defaultValue={""}
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

              <div className="py-6 w-full">
                <button type="submit" className="btn-full">
                  Submit
                </button>
              </div>
            </div>

            <div className="flex-2 md:block hidden">
              <img src="https://i.ibb.co.com/4RG2H37W/Asset-2.png" />
            </div>
          </div>
        </fieldset>
      </form>
    </Container>
  );
};

export default AddIssue;
