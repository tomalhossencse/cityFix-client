import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Container from "../../Utility/Container";
import { AuthContext } from "../../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { Link, useNavigate, useParams } from "react-router";
import { GenerateTrackingId } from "../../Utility/GenerateTrackingId";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaRocket } from "react-icons/fa6";
import Loading from "../../Components/Loading/Loading";
import { ArrowLeftIcon } from "lucide-react";
import { uploadImg } from "../../Utility";
import { districtsByRegion, issueCategories, regions } from "../../assets/assets";

const IssueForm = () => {
  const { user, loading } = useContext(AuthContext);
  const { id } = useParams();

  const isEdit = Boolean(id);
  const [saving, setSaving] = useState(false);

  const [imageFile, setImageFile] = useState(null)
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    getValues,
  } = useForm();


  const region = watch("region");
  const photo = isEdit && getValues('photo');


  const {
    isLoading: issueLoading,
    refetch,
  } = useQuery({
    queryKey: ["issues", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${id}`);
      reset({
        issueTitle: res.data.issueTitle,
        category: res.data.category,
        region: res.data.region,
        district: res.data.district,
        photo: res.data.photo,
        displayName: res.data.displayName,
        email: res.data.email,
        number: res.data.number,
        area: res.data.area,
        information: res.data.information,
      })
      return res.data;
    },
    enabled: !!id,
  });


  const { data: stats = [], isLoading: dashboardLoading } = useQuery({
    queryKey: ["dashboard", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/stats?email=${user?.email}`
      );
      return res.data;
    },
  });

  const { data: userDetails, isLoading } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });



  const handleAddIssue = async (data) => {
    try {
      setSaving(true)
      const issueImg = data.photoURL[0];
      const { accountStatus } = userDetails;
      if (accountStatus === "blocked") {
        return toast.error("Your Account is Blocked By Admin");
      }

      if (isEdit) {
        if (issueImg) {
          const photoURL = await uploadImg(issueImg);
          data.photo = photoURL;
        }
        const res = await axiosSecure.patch(`/issues/${id}`, data);

        if (res.data.modifiedCount) {
          navigate("/dashboard/my-issues");
          refetch();
          Swal.fire({
            icon: "success",
            title: "Issue Updated Successfully",
            timer: 1500,
            showConfirmButton: false,
          });
        }
        return;
      }

      // upload img to imgbb
      const photoURL = await uploadImg(issueImg);

      data.photo = photoURL;
      data.createAt = new Date();
      data.trackingId = GenerateTrackingId();
      data.status = "pending";
      data.priority = "normal";
      data.upvoteCount = 0;
      data.timeline = [
        {
          status: "pending",
          message: "Issue reported",
          updatedBy: {
            role: "citizen",
            name: user?.displayName,
            email: user?.email,
          },
          createdAt: new Date(),
        },
      ];

      const res = await axiosSecure.post("/issues", data);
      if (res.data.insertedId) {
        navigate("/dashboard/my-issues");
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Report Issue Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to report the issue. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || isLoading || dashboardLoading || issueLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-app-border overflow-hidden">
        <div className="px-6 py-5 border-b border-app-border flex items-center gap-4">
          <Link to='/dashboard/my-issues' className="p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-500 rounded-lg transition-colors">
            <ArrowLeftIcon className="size-5" />
          </Link>
          <h2 className="text-xl font-semibold text-zinc-900">
            {isEdit ? "Edit Issue" : "New Issue"}
          </h2>
        </div>

        {
          loading ? <Loading /> : (
            <form onSubmit={handleSubmit(handleAddIssue)} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* issue title */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Issue Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 focus:border-app-green focus:ring-1 focus:ring-app-green outline-none transition-all"
                    // placeholder="Issue Title"
                    {...register("issueTitle", { required: true })}
                  />
                  {errors.issueTitle?.type === "required" && (
                    <p className="text-sm text-red-500 ">Issue Title Required!</p>
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
                    <p className="text-sm text-red-500">
                      Category Required!
                    </p>
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
                  {errors.region?.type === "required" && (
                    <p className="text-sm text-red-500 ">Region Required!</p>
                  )}
                </div>

                {/* district */}
                <div>
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
                  {errors.district?.type === "required" && (
                    <p className="text-sm text-red-500 ">District Required!</p>
                  )}
                </div>

                {/* photo */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Issue Image</label>
                  <div className="flex items-center gap-4">
                    {
                      (imageFile || photo) && (
                        <div className="size-16 rounded-lg border border-zinc-200 overflow-hidden shrink-0 bg-app-cream">
                          <img src={imageFile ? URL.createObjectURL(imageFile) : photo} className="w-full h-full object-cover" alt="preview" />
                        </div>
                      )
                    }

                    <input
                      type="file"
                      accept="image/*"
                      {...register("photoURL", { required: !isEdit })}
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 focus:border-app-green outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-app-orange file:text-white hover:file:bg-orange-600 cursor-pointer"
                    />

                  </div>
                  {errors.photoURL?.type === "required" && (
                    <p className="text-sm text-red-500 ">Image is Required</p>
                  )}

                </div>

                {/* username */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">User Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 focus:border-app-green focus:ring-1 focus:ring-app-green outline-none transition-all"
                    // placeholder="Your Name"
                    defaultValue={user?.displayName}
                    readOnly
                    {...register("displayName", { required: true })}
                  />
                </div>

                {/* email */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 focus:border-app-green focus:ring-1 focus:ring-app-green outline-none transition-all"
                    // placeholder="Email"
                    defaultValue={user?.email}
                    readOnly
                    {...register("email", { required: true })}
                  />
                </div>

                {/* contact */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Contact No</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 focus:border-app-green focus:ring-1 focus:ring-app-green outline-none transition-all"
                    // placeholder="Contact No."
                    {...register("number", { required: true })}
                  />
                  {errors.number?.type === "required" && (
                    <p className="text-sm text-red-500 ">Contact No. Required!</p>
                  )}
                </div>

                {/* area */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Area</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 focus:border-app-green focus:ring-1 focus:ring-app-green outline-none transition-all"
                    // placeholder="Your Area"
                    {...register("area", { required: true })}
                  />
                  {errors.area?.type === "required" && (
                    <p className="text-sm text-red-500 ">Area Required!</p>
                  )}
                </div>

                {/* additional Information */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Additional Information</label>
                  <textarea
                    rows={4}
                    type="text"
                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 focus:border-app-green focus:ring-1 focus:ring-app-green outline-none transition-all resize-none"
                    // placeholder="Your Additional Information"
                    {...register("information", { required: true })}
                  />

                  {errors.information?.type === "required" && (
                    <p className="text-sm text-red-500 ">
                      Additional Information Required!
                    </p>
                  )}
                </div>
              </div>

              {/* submit button */}

              <div className="pt-6 border-t border-app-border">
                {stats?.issues?.total >= 3 && !userDetails.isSubscribed ? (
                  <div>
                    <Link to={"/dashboard/profile"} className="w-fit  px-6 py-2.5 bg-app-orange text-white flex items-center gap-2 font-medium rounded-lg hover:bg-orange-600 transition-colors">
                      <FaRocket /> Go to Profile Page

                    </Link>
                    <span className="text-sm text-red-500 mt-2">
                      Please go to profile page subscribe to add more issue
                    </span>

                  </div>
                ) : (
                  <div className="flex justify-end">
                    <button disabled={saving} type="submit" className="px-6 py-2.5 bg-app-orange text-white flex items-center gap-2 font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50">
                      {saving ? "saving..." : "Save Issue"}
                    </button>
                  </div>
                )}
              </div>
              <div>

              </div>
            </form>
          )
        }
      </div >
    </>

  );
};

export default IssueForm;
