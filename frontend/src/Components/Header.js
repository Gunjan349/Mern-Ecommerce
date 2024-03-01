import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { toast } from "react-toastify";

const Header = () => {
  return (
    <>
      <header>
        <div className="bg-purple border-y px-7 text-white  text-lg py-1 flex justify-between items-center xs:px-2 xs:text-lg xs:flex-col sm:px-4  lg:px-7">
          <div className="inline">
            anytime anywhere
            <h1 className="inline ml-2 text-brown">nearYou</h1>
          </div>
          <div className="flex  items-center gap-1">
            <FaPhoneVolume />
            <h3> xxxxxxxxxx</h3>
          </div>
        </div>
        <div className="nav-bar pt-4 pb-2 text-brown  px-3 flex border-b sm:border-b-0">
          <div className="logo-div ml-1">
            <h3 className="text-4xl ">nearYou</h3>
          </div>
          <div className="nav-right flex items-center gap-10  z-10">
            <Link to="/login">
              <FaRegUser size={25} className="hover:scale-75 duration-500" />
            </Link>

            <Link>
              <MdLogout
                size={35}
                className="hover:scale-75 duration-500"
                onClick={() => {
                  localStorage.removeItem("token");
                  toast.success("Logged out successfully");
                }}
              />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
