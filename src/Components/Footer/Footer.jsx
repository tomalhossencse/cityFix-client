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
                className="text-xl cursor-pointer  font-medium pb-6"
              >
                SkillSwap
              </button>
              <p className="text-white">
                An interactive platform for individuals to offer, learn, and
                trade skills within their local area. Whether it’s guitar
                lessons, language exchange, coding help, or yoga training —
                users can browse listings, rate experiences, and connect with
                local skill providers.
              </p>
            </div>
            <div className=" col-span-1">
              <h1 className="text-xl font-medium pb-6">Company</h1>
              <ul className="flex flex-col gap-4">
                <a className="text-white" href="#">
                  About Us
                </a>
                <a className="text-white" href="#">
                  Our Mission
                </a>
                <a className="text-white" href="#">
                  Contact Saled
                </a>
              </ul>
            </div>
            <div className=" col-span-1">
              <h1 className="text-xl font-medium pb-6">Services</h1>
              <ul className="flex flex-col gap-4">
                <a className="text-white" href="#">
                  Products & Services
                </a>
                <a className="text-white" href="#">
                  Customer Stories
                </a>
                <a className="text-white" href="#">
                  Download Apps
                </a>
              </ul>
            </div>
            <div className=" col-span-1">
              <h1 className="text-xl font-medium pb-6">Information</h1>
              <ul className="flex flex-col gap-4">
                <a className="text-white" href="#">
                  Privacy Policy
                </a>
                <a className="text-white" href="#">
                  Terms & Conditions
                </a>
                <a className="text-white" href="#">
                  Join Us
                </a>
              </ul>
            </div>
            <div className=" col-span-1">
              <h1 className="text-xl font-medium pb-6">Social Links</h1>
              <ul className="flex flex-col gap-4">
                <li className="flex gap-2 items-center">
                  <FaSquareXTwitter className="text-white text-xl" />
                  <a className="text-white" href="#">
                    @CS — SkillSwap
                  </a>
                </li>
                <li className="flex gap-2 items-center">
                  <FaLinkedin className="text-white text-xl" />
                  <a className="text-white" href="#">
                    @CS — SkillSwap
                  </a>
                </li>
                <li className="flex gap-2 items-center">
                  <FaFacebookSquare className="text-white text-xl" />
                  <a className="text-white" href="#">
                    @CS — SkillSwap
                  </a>
                </li>
                <li className="flex gap-2 items-center">
                  <IoMdMail className="text-white text-xl" />
                  <a className="text-white" href="#">
                    support@cst.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            © 2025 SkillSwap – A Local Skill Exchange Platform. All rights
            reserved.
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
