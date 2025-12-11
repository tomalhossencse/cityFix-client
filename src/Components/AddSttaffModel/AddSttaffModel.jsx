import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";

const AddSttaffModel = ({ modelRef, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { signUp } = useContext(AuthContext);
  const { data: locations = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/districtbyRegion");
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

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

  const handleAddSttaf = async (data) => {
    try {
      data.createdAt = new Date();
      data.role = "staff";
      const { email, password, photo, sttafName } = data;

      await signUp(email, password);

      await updateProfile(auth.currentUser, {
        displayName: sttafName,
        photoURL: photo,
      });

      const userInfo = {
        email,
        displayName: sttafName,
        photoURL: photo,
        createdAt: new Date(),
        role: "staff",
        accountStatus: "active",
        planType: "free",
        isSubscribed: false,
      };

      await axiosSecure.post("/users", userInfo);

      const res = await axiosSecure.post(`/sttafs`, data);

      if (res.data.insertedId) {
        refetch();
        modelRef.current.close();
        Swal.fire({
          position: "top-right",
          icon: "success",
          title: "New Staff Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error adding staff:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while adding the staff!",
      });
    }
    reset();
  };

  return (
    <dialog
      ref={modelRef}
      id="my_modal_5"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <form
          onSubmit={handleSubmit(handleAddSttaf)}
          className="bg-accent-content md:py-6 py-2 md:px-6 px-4 rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transform transition duration-1000 ease-in-out hover:bg-base-200 hover:-translate-y-1"
        >
          <fieldset className="fieldset">
            <h1 className="font-black text-xl md:text-2xl text-primary">
              Add New Sttaf
            </h1>

            {/* divider */}
            <div className="divider"></div>

            <>
              <div>
                {/* name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <legend className="fieldset-legend">Sttaf Name</legend>
                    <input
                      type="text"
                      className="input w-full md:input-md input-sm"
                      placeholder="Sttaf Name"
                      {...register("sttafName", { required: true })}
                    />
                    {errors.sttafName?.type === "required" && (
                      <p className="text-red-500 py-2">
                        Sttaf Name is Required!
                      </p>
                    )}
                  </div>
                  <div className="">
                    <legend className="fieldset-legend">Profile Photo</legend>
                    <input
                      type="text"
                      className="input w-full md:input-md input-sm"
                      placeholder="Profile Photo"
                      {...register("photo", { required: true })}
                    />
                    {errors.photo?.type === "required" && (
                      <p className="text-red-500 py-2">
                        Profile Photo url Required!
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
                      {...register("email", { required: true })}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <legend className="fieldset-legend">Password</legend>
                    <input
                      type="password"
                      className="input w-full md:input-md input-sm"
                      placeholder="Password"
                      {...register("password", { required: true })}
                    />
                    {errors.password?.type === "required" && (
                      <p className="text-red-500 py-2">Password Required!</p>
                    )}
                  </div>
                  {/* category */}
                  <div>
                    <legend className="fieldset-legend">Category</legend>
                    <select
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
                      <p className="text-red-500 py-2">Category Required!</p>
                    )}
                  </div>
                  {/* contact */}
                  <div>
                    <legend className="fieldset-legend">Contact No.</legend>
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
                  {/* region */}
                  <div>
                    <legend className="fieldset-legend">Sttaf Region</legend>
                    <select
                      defaultValue={""}
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
                      <p className="text-red-500 py-2">
                        Sttaf Region Required!
                      </p>
                    )}
                  </div>
                  {/* district */}
                  <div>
                    <legend className="fieldset-legend">Sttaf District</legend>
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
                    <legend className="fieldset-legend">Staff Address</legend>
                    <input
                      type="text"
                      className="input w-full md:input-md input-sm"
                      placeholder="Sttaf Address"
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
                      placeholder="Add your bio"
                      {...register("information", { required: true })}
                    />

                    {errors.information?.type === "required" && (
                      <p className="text-red-500 py-2">Bio Required!</p>
                    )}
                  </div>
                </div>

                {/* button */}

                <div className="py-6 w-full">
                  <button type="submit" className="btn-small-full">
                    Add Sttaf
                  </button>
                </div>
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

export default AddSttaffModel;
