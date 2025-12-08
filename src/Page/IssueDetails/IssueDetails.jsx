import React, { useContext, useRef } from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FcHighPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";
import { FaPhoneVolume, FaRegCircleUser } from "react-icons/fa6";
import { MdEditSquare, MdHowToVote, MdMarkEmailRead } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { CiLocationOn } from "react-icons/ci";
import { FaMapMarkedAlt } from "react-icons/fa";
import Container from "../../Utility/Container";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import {
  MdOutlinePendingActions,
  MdOutlineTaskAlt,
  MdLockOutline,
} from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosTime, IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router";
import Loading from "../../Components/Loading/Loading";
import { DateFormat } from "../../Utility/FormateDate";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { IoRocket } from "react-icons/io5";

const IssueDetails = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const modelRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const {
    data: issue,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["issues", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // console.log(issue);

  const { data: locations = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/districtbyRegion");
      //   console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const {
    issueTitle,
    createAt,
    photo,
    district,
    region: Region,
    priority,
    status,
    upvoteCount,
    category,
    displayName,
    number,
    email,
    _id,
    information,
    area,
  } = issue;

  const statusIcon = {
    pending: <MdOutlinePendingActions />,
    "in-progress": <AiOutlineLoading3Quarters />,
    resolved: <MdOutlineTaskAlt />,
    closed: <MdLockOutline />,
  };

  const statusColor = {
    pending: "bg-yellow-600 text-white",
    "in-progress": "bg-blue-600 text-white",
    resolved: "bg-green-600  text-white",
    closed: "bg-gray-500  text-white",
  };

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

  const handleUpdateIssue = (data) => {
    console.log(data);
    axiosSecure.patch(`/issues/${_id}`, data).then((res) => {
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
        axiosSecure.delete(`/issues/${_id}`).then((res) => {
          if (res.data.deletedCount) {
            navigate("/all-issues");
            Swal.fire({
              position: "top-right",
              title: "Deleted!",
              icon: "success",
              text: "Your Reported Issues has been deleted.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  const handlePayment = async () => {
    const paymentInfo = {
      issueId: _id,
      email,
      issueTitle,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  return (
    <Container className="md:min-h-screen md:mt-30 mt-8 md:p-6 p-4">
      <div
        className="md:flex justify-center gap-6 items-base bg-base-200 py-16 rounded-xl space-y-4 shadow-md   px-4          transform transition duration-300 ease-in-out 
            hover:scale-105  hover:-translate-y-1"
      >
        <div className="flex-2 md:pl-6 w-[300px]">
          <img className="rounded-xl w-full h-full object-cover" src={photo} />
          <div className="flex px-0  md:px-4 mt-6 items-center justify-between text-accent">
            <div
              className={`flex gap-2  items-center justify-center ${
                priority === "normal" ? "text-primary" : "text-red-500"
              }`}
            >
              <span>
                {priority === "normal" ? (
                  <FcLowPriority size={20} />
                ) : (
                  <FcHighPriority size={20} />
                )}
              </span>
              <span className={`font-bold`}>{priority.toUpperCase()}</span>
            </div>

            <div
              className={`flex items-center text-md font-bold justify-center gap-2 py-1 px-4 rounded-3xl ${statusColor[status]}`}
            >
              <span>{statusIcon[status]}</span>
              <span>{status.toUpperCase()} </span>
            </div>

            <div className="p-4 btn btn-xs hover:bg-primary hover:text-white  flex items-center justify-center gap-1 font-bold text-[16px] bg-blue-600 text-white  rounded-3xl">
              <span>
                <MdHowToVote />
              </span>
              <span>
                UPVOTE : <span> {upvoteCount}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex-3 flex flex-col justify-center items-start px-2 space-y-2">
          <div className="flex gap-2 text-2xl md:text-3xl font-bold items-center justify-center text-primary">
            <span>{issueTitle}</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-primary rounded-2xl text-secondary font-bold px-4 py-1">
            <BiSolidCategoryAlt />

            <span>{category}</span>
          </div>

          <div className="flex">
            <div className="md:px-2 md:py-2 rounded-md flex gap-2 items-center">
              <div className="text-primary">
                <FaRegCircleUser size={20} />
              </div>
              <p>{displayName}</p>
            </div>

            <div className="flex items-center justify-center gap-1">
              <span>
                <CiLocationOn />
              </span>
              <span>
                {district}, {Region}
              </span>
            </div>
          </div>
          {/* contact */}
          <div className="md:flex gap-4">
            <div className="bg-primary text-base-100 px-4 py-2 rounded-md my-2 flex gap-2 items-center">
              <div>
                <FaPhoneVolume />
              </div>
              <span>{number}</span>
            </div>
            <div className="bg-red-500 text-base-100 px-4 py-2 rounded-md my-2 flex gap-2 items-center">
              <div>
                <MdMarkEmailRead size={20} />
              </div>
              <span>{email}</span>
            </div>
          </div>

          <div className="md:flex">
            {/* area */}
            <div className="flex items-center gap-2 text-lg text-accent md:px-2 py-4 rounded-md ">
              <FaMapMarkedAlt size={20} />
              <span>{area}</span>
            </div>
            {/* Added time */}
            <div className="rounded-md flex gap-2 items-center">
              <div className="text-primary">
                <IoIosTime size={24} />
              </div>
              <p>{DateFormat(createAt)}</p>
            </div>
          </div>

          {/* information */}
          <div className="bg-accent/10 text-accent  w-full md:w-4/5 px-4 py-4 rounded-md">
            {information}
          </div>
          <div className="flex flex-wrap gap-6 items-center justify-center text-accent mt-3">
            {user.email === email && status === "pending" && (
              <div
                onClick={() => modelRef.current.showModal()}
                className="btn-small-black hover:bg-primary hover:text-white btn-sm flex items-center justify-center gap-1 font-bold text-lg text-blue-600 bg-blue-100 rounded-3xl px-3"
              >
                <span>
                  <MdEditSquare />
                </span>
                <span>Edit</span>
              </div>
            )}
            {user.email === email && (
              <>
                <div
                  onClick={handleDelete}
                  className="flex items-center justify-center gap-1 btn-small-red"
                >
                  <span>
                    <RiDeleteBin5Fill size={16} />
                  </span>
                  <span>Delete</span>
                </div>

                <button
                  onClick={handlePayment}
                  className="flex items-center justify-center gap-1 btn-small-blue"
                >
                  <span>
                    <IoRocket size={16} />
                  </span>
                  <span>Boost</span>
                </button>
              </>
            )}
            <button onClick={() => navigate(-1)} className="btn-small">
              <span>
                <IoMdArrowRoundBack size={18} />
              </span>
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>
      {/* model */}
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
                        defaultValue={issueTitle}
                        {...register("issueTitle", { required: true })}
                      />
                      {errors.issueTitle?.type === "required" && (
                        <p className="text-red-500 py-2">
                          Issue Title Required!
                        </p>
                      )}
                    </div>
                    <div className="">
                      <legend className="fieldset-legend"> Photo Url</legend>
                      <input
                        type="text"
                        className="input w-full md:input-md input-sm"
                        placeholder="Issue photo url"
                        defaultValue={photo}
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
                        defaultValue={category}
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
                        defaultValue={number}
                        {...register("number", { required: true })}
                      />
                      {errors.number?.type === "required" && (
                        <p className="text-red-500 py-2">
                          Contact No. Required!
                        </p>
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
                      {errors.displayName?.type === "required" && (
                        <p className="text-red-500 py-2">User Name Required!</p>
                      )}
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
                        defaultValue={area}
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
                        defaultValue={information}
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
                    <button type="submit" className="btn-small-full">
                      Submit
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
    </Container>
  );
};

export default IssueDetails;
