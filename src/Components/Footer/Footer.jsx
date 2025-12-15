import React from "react";
import { IoMdMail } from "react-icons/io";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router";
import Container from "../../Utility/Container";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-primary text-white mt-12 md:px-0 px-6 ">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 justify-between py-16 gap-10 text-sm">
            <div className="col-span-2">
              <button
                onClick={() => navigate("/")}
                className="text-xl cursor-pointer font-medium pb-6"
              >
                CityFix
              </button>
              <p className="text-white">
                CityFix is a platform for citizens to report local issues, track
                progress, and see resolutions in real-time. From road repairs to
                streetlight outages, we make your city better together.
              </p>
            </div>
            <div className="col-span-1">
              <h1 className="text-xl font-medium pb-6">Company</h1>
              <ul className="flex flex-col gap-4">
                <a className="text-white" href="#">
                  About CityFix
                </a>
                <a className="text-white" href="#">
                  Our Mission
                </a>
                <a className="text-white" href="#">
                  Contact Us
                </a>
              </ul>
            </div>
            <div className="col-span-1">
              <h1 className="text-xl font-medium pb-6">Services</h1>
              <ul className="flex flex-col gap-4">
                <a className="text-white" href="#">
                  Report an Issue
                </a>
                <a className="text-white" href="#">
                  Track Progress
                </a>
                <a className="text-white" href="#">
                  View Resolved Issues
                </a>
              </ul>
            </div>
            <div className="col-span-1">
              <h1 className="text-xl font-medium pb-6">Information</h1>
              <ul className="flex flex-col gap-4">
                <a className="text-white" href="#">
                  Privacy Policy
                </a>
                <a className="text-white" href="#">
                  Terms & Conditions
                </a>
                <a className="text-white" href="#">
                  Join CityFix
                </a>
              </ul>
            </div>
            <div className="col-span-1">
              <h1 className="text-xl font-medium pb-6">Social Links</h1>
              <ul className="flex flex-col gap-4">
                <li className="flex gap-2 items-center">
                  <FaSquareXTwitter className="text-white text-xl" />
                  <a className="text-white" href="#">
                    @CityFix
                  </a>
                </li>
                <li className="flex gap-2 items-center">
                  <FaLinkedin className="text-white text-xl" />
                  <a className="text-white" href="#">
                    @CityFix
                  </a>
                </li>
                <li className="flex gap-2 items-center">
                  <FaFacebookSquare className="text-white text-xl" />
                  <a className="text-white" href="#">
                    @CityFix
                  </a>
                </li>
                <li className="flex gap-2 items-center">
                  <IoMdMail className="text-white text-xl" />
                  <a className="text-white" href="#">
                    support@cityfix.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            © 2025 CityFix – A Civic Issue Reporting Platform. All rights
            reserved.
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
