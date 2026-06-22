import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { districtsByRegion, issueCategories, regions } from "../../assets/assets";
import { Form, Link, useNavigate, useParams } from "react-router";
import { ArrowLeftIcon, Eye, EyeOff, LockIcon, UserCircle2Icon, XIcon } from "lucide-react";
import { uploadImg } from "../../Utility";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";

const AddSttaffModel = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null)
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm();



  const {
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: ["sttafs", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sttafs/${id}`);
      reset({
        sttafName: res.data.sttafName,
        email: res.data.email,
        password: res.data.password,
        number: res.data.number,
        photo: res.data.photo,
        information: res.data.information,
        category: res.data.category,
        area: res.data.area,
        region: res.data.region,
        district: res.data.district,
      })
      return res.data;
    },
    enabled: !!id,
  });
  const photo = isEdit && getValues('photo');
  const region = watch("region");

  const handleAddSttaf = async (data) => {
    try {
      setSaving(true)
      const profileImg = data.photoURL[0];
      if (isEdit) {
        if (profileImg) {
          const photoURL = await uploadImg(profileImg);
          data.photo = photoURL;
        }
        const res = await axiosSecure.patch(`/sttafs/${id}`, data);
        if (res.data.modifiedCount) {
          navigate('/dashboard/manage-staffs')
          Swal.fire({
            position: "top-right",
            icon: "success",
            title: "Report Issue Upadated Successfully",
            showConfirmButton: false,
            timer: 1500,
          })
        }
        return;
      }
      const photoURL = await uploadImg(profileImg);
      data.createdAt = new Date();
      data.photo = photoURL;
      data.role = "staff";
      data.workStatus = "available";
      const { email, password, photo, staffName } = data;

      const authRes = await axiosSecure.post("/create-staff-auth", {
        email,
        password,
        displayName: staffName,
        photoURL: photo,
      });

      const userInfo = {
        email,
        displayName: staffName,
        photoURL: photo,
        createdAt: new Date(),
        role: "staff",
        accountStatus: "active",
        planType: "free",
        isSubscribed: false,
        uid: authRes.data.uid,
      };

      await axiosSecure.post("/users", userInfo);

      const res = await axiosSecure.post(`/sttafs`, data);

      if (res.data.insertedId) {
        navigate('/dashboard/manage-staffs')
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
    finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-app-border overflow-hidden">
      <div className="px-6 py-5 border-b border-app-border flex items-center gap-4">
        <Link to='/dashboard/manage-staffs' className="p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-500 rounded-lg transition-colors">
          <ArrowLeftIcon className="size-5" />
        </Link>
        <h2 className="text-xl font-semibold text-zinc-900">
          {isEdit ? "Edit Staff" : "Add Staff"}
        </h2>
      </div>
      {isLoading ? <Loading /> :

        (<form onSubmit={handleSubmit(handleAddSttaf)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* name */}
            <div>
              <label className="block text-sm font-medium text-app-green mb-1.5">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none"
                {...register("sttafName", { required: true })}
              />
              {errors.sttafName?.type === "required" && (
                <p className="text-red-500 text-sm">
                  Sttaf Name is Required!
                </p>
              )}
            </div>
            {/* email */}
            <div>
              <label className="block text-sm font-medium text-app-green mb-1.5">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500 text-sm">
                  Sttaf Email is Required!
                </p>
              )}
            </div>

            {/* Password */}
            <label className="text-sm flex flex-col gap-1">
              Password
              <div className="relative">
                <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                <input
                  type={show ? "text" : "password"}
                  className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border  not-focus:border-app-border transition-all"
                  placeholder="•••••••••"
                  {...register("password", {
                    required: true,
                  })}
                />

                <button type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-app-text-light cursor-pointer"
                >
                  {show ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeOff className="size-4" />
                  )}
                </button>
              </div>
              {errors.password?.type === "required" && (
                <p className="text-red-500 text-sm">
                  Password Required!
                </p>
              )}
            </label>

            {/* contact */}
            <div>
              <label className="block text-sm font-medium text-app-green mb-1.5">Contact No.</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none"
                {...register("number", { required: true })}
              />
              {errors.number?.type === "required" && (
                <p className="text-red-500 text-sm">Contact No. Required!</p>
              )}
            </div>

            {/* profile photo */}
            <div>
              <label className="text-sm flex flex-col gap-1">Photo
                <div className="flex items-center gap-4">
                  {
                    (imageFile || photo) && (
                      <div className="size-16 rounded-lg border border-zinc-200 overflow-hidden shrink-0 bg-app-cream">
                        <img src={imageFile ? URL.createObjectURL(imageFile) : photo} className="w-full h-full object-cover" alt="preview" />
                      </div>
                    )
                  }

                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      {...register("photoURL", { required: !isEdit })}
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      className="w-full pl-11  pr-4 py-1 rounded-xl text-sm bg-white border border-zinc-200 focus:border-app-green outline-none transition-all file:mr-4 file:py-2  file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-app-orange file:text-white hover:file:bg-orange-600 cursor-pointer"
                    />
                    <UserCircle2Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                  </div>

                </div>
                {errors.photoURL?.type === "required" && (
                  <p className="text-red-500 text-sm">Profile Photo is Required</p>
                )}
              </label>
            </div>

            {/* additional Information */}
            <div>
              <label className="text-sm font-medium text-zinc-700 mb-2">Additional Information</label>
              <textarea
                rows={1}
                type="text"
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 focus:border-app-green focus:ring-1 focus:ring-app-green outline-none transition-all resize-none"
                {...register("information", { required: true })}
              />

              {errors.information?.type === "required" && (
                <p className="text-sm text-red-500 text-sm ">
                  Additional Information Required!
                </p>
              )}
            </div>



            {/* category */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Category</label>
              <select
                defaultValue={""}
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 focus:border-app-green focus:ring-1 focus:ring-app-green outline-none transition-all bg-white"
                {...register("category", { required: true })}
              >
                <option value="" >
                  Select a category
                </option>
                {issueCategories.map((cat, index) => (
                  <option value={cat} key={index}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category?.type === "required" && (
                <p className="text-red-500 text-sm">
                  Category Required!
                </p>
              )}
            </div>

            {/* area */}
            <div>
              <label className="block text-sm font-medium text-app-green mb-1.5"><label className="block text-sm font-medium text-app-green mb-1.5">Staff Address</label></label>
              <input
                type="text"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none"
                {...register("area", { required: true })}
              />
              {errors.area?.type === "required" && (
                <p className="text-red-500 text-sm">Area Required!</p>
              )}
            </div>


            {/* region */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Your Region</label>
              <select
                defaultValue=""
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 focus:border-app-green focus:ring-1 focus:ring-app-green outline-none transition-all bg-white"
                {...register("region", { required: true })}
              >
                <option value="" disabled>
                  Select Your Region
                </option>
                {regions.map((region, index) => (
                  <option key={index}>{region}</option>
                ))}
              </select>
              {
                errors.region?.type === "required" && (
                  <p className="text-sm text-red-500">Region Required!</p>
                )
              }
            </div>

            {/* district */}
            < div >
              <label className="block text-sm font-medium text-zinc-700 mb-2">District</label>
              <select
                defaultValue=""
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 focus:border-app-green focus:ring-1 focus:ring-app-green outline-none transition-all bg-white"
                {...register("district", { required: true })}
              >
                <option value="" disabled>
                  Select District
                </option>
                {region &&
                  districtsByRegion(region).map((district, index) => (
                    <option value={district} key={index}>
                      {district}
                    </option>
                  ))}
              </select>
              {
                errors.district?.type === "required" && (
                  <p className="text-sm text-red-500">District Required!</p>
                )
              }
            </div >

            {/* button */}


          </div >
          <div className="pt-6 border-t border-app-border">
            < div className="flex justify-end" >
              <button disabled={saving} type="submit" className="px-6 py-2.5 bg-app-orange text-white flex items-center gap-2 font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50">
                {saving ? "Saving..." : "Saving Staff"}
              </button>
            </div >
          </div>
        </form >)
      }
    </div >)
};

export default AddSttaffModel;
