import React from "react";
import Container from "../../../Utility/Container";
import { appPromoBannerData, assets } from "../../../assets/assets";
import { Link } from "react-router";
const JoinCleanDrive = () => {
  return (
    // <div className="py-6 px-6">
    //   <Container className="md:flex items-center justify-between">
    //     <div className="p-4">
    //       <img src="https://i.ibb.co.com/9XNGWG9/Asset-1.png" alt="" />
    //     </div>
    //     <div className="p-4">
    //       <h2 className="md:text-3xl text-2xl font-bold text-primary mb-4">
    //         Join Our Clean Drive
    //       </h2>
    //       <p className="text-accent text-sm md:text-md max-w-2xl mb-6">
    //         Take part in our upcoming community clean drive and help make Dhaka
    //         a cleaner, greener city. Your small action can bring a big change to
    //         our neighborhoods!
    //       </p>
    //       <button className="px-6 py-3 bg-primary text-white font-bold text-md rounded-md shadow-md hover:bg-black transition-transform hover:scale-105">
    //         Join the Drive
    //       </button>
    //     </div>
    //   </Container>
    // </div>
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 my-14 bg-green-950 rounded-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 xl:px-10">
        {/* left side content */}
        <div className="text-center md:text-left">
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-3">
            {appPromoBannerData.title}
          </h2>
          <p className="text-white/70 mb-6 max-w-md">
            {appPromoBannerData.description}
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Link to='/login' className="px-6 py-3 bg-white text-green-950 font-semibold rounded-xl hover:bg-orange-100">
              Join the Drive
            </Link>
            <Link to='/dashboard/report-issues' className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors">
              Report Issue
            </Link>
          </div>
        </div>
        {/* right side image */}
        <img
          src={assets.join_drive}
          alt="Delivery Truck"
          className="max-w-60 sm:max-w-120 xl:pr-10"
        />
      </div>
    </section>
  );
};

export default JoinCleanDrive;
