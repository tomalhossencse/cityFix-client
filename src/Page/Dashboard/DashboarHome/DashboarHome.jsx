import React from "react";
import { FaRegUser } from "react-icons/fa";
const DashboardHome = () => {
  return (
    <div className="p-6">
      <h1>This Citzen dashboard home</h1>
      <div className="grid grid-cols-6 gap-6">
        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <FaRegUser size={54} />
          <div>
            <p className="text-xl font-semibold text-accent">To Pay</p>
            <h1 className="text-4xl font-black  ">129</h1>
            <p></p>
          </div>
        </div>
        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <FaRegUser size={54} />
          <div>
            <p className="text-xl font-semibold text-accent">To Pay</p>
            <h1 className="text-4xl font-black  ">129</h1>
            <p></p>
          </div>
        </div>
        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <FaRegUser size={54} />
          <div>
            <p className="text-xl font-semibold text-accent">To Pay</p>
            <h1 className="text-4xl font-black  ">129</h1>
            <p></p>
          </div>
        </div>
        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <FaRegUser size={54} />
          <div>
            <p className="text-xl font-semibold text-accent">To Pay</p>
            <h1 className="text-4xl font-black  ">129</h1>
            <p></p>
          </div>
        </div>

        <div className="flex text-accent items-center gap-4 justify-center bg-base-100  rounded-md p-6">
          <FaRegUser size={54} />
          <div>
            <p className="text-xl font-semibold text-accent">To Pay</p>
            <h1 className="text-4xl font-black  ">129</h1>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
