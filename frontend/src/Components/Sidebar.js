import React from "react";

import "../App.css";
import { NavLink, Link } from "react-router-dom";

import { FaHome } from "react-icons/fa";
import { BiSolidStore } from "react-icons/bi";
import { MdEditNote } from "react-icons/md";
import { FaEnvelope } from "react-icons/fa6";
import { CiBag1 } from "react-icons/ci";
import { GiConverseShoe } from "react-icons/gi";
import { RiHomeOfficeFill } from "react-icons/ri";
import { RiBearSmileFill } from "react-icons/ri";
import { SiBookstack } from "react-icons/si";
import { FaMobileAlt } from "react-icons/fa";

const sidebar = () =>{
    return(
        <>
              <div className="hero-section flex">
          <div className="side-bar z-10 w-60 mx-8 mt-8 text-white bg-purple rounded-md shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] sm:w-10 sm:mt-10 sm:mx-6 relative cursor-pointer">
            <div className="menu-home pl-6 sm:pl-0 hover:bg-lightpurple">
              <NavLink
                to="/"
                className=" whitespace-nowrap group"
              >
                <FaHome size={25} className="inline sm:ml-2 group-hover:scale-125 transition duration-150"/>
                <p className="inline sm:ml-6 sm:invisible sm:group-hover:visible sm:group-hover:text-white sm:group-hover:bg-lightpurple sm:group-hover:p-1 sm:group-hover:rounded-md pl-3 transition-all duration-300"> Home</p>
              </NavLink>
            </div>
            <div className="pl-6 sm:pl-0 hover:bg-lightpurple">
              <NavLink
                to="/store"
                className="menu-store whitespace-nowrap group"
              >
                <BiSolidStore size={25} className="store inline sm:ml-2 group-hover:scale-125 transition duration-150" />
                <p className="inline sm:ml-6 sm:group-hover:text-white sm:group-hover:bg-lightpurple sm:group-hover:p-1 sm:group-hover:rounded-md pl-3 transition-all duration-300">Our Store</p>
              </NavLink>
            </div>
            <div className="pl-6 sm:pl-0 hover:bg-lightpurple">
              <NavLink
                to="/womenfashion"
                className="menu-blogs  whitespace-nowrap group "
              >
                <CiBag1 size={25} className="inline sm:ml-2 group-hover:scale-125 transition duration-150"/>
                <p className=" pr-7 inline sm:ml-6 sm:invisible sm:group-hover:visible sm:group-hover:text-white sm:group-hover:bg-lightpurple sm:group-hover:p-1 sm:group-hover:rounded-md pl-3 transition-all duration-300">Women's Fashion</p>
              </NavLink>
            </div>
            <div className="pl-6 sm:pl-0 hover:bg-lightpurple">
              <NavLink
                to="/menfashion"
                className="menu-blogs  whitespace-nowrap group"
              >
                <GiConverseShoe size={25} className="inline sm:ml-2 group-hover:scale-125 transition duration-150"/>
                <p className=" inline sm:ml-6 sm:invisible sm:group-hover:visible sm:group-hover:text-white sm:group-hover:bg-lightpurple sm:group-hover:p-1 sm:group-hover:rounded-md pl-3 transition-all duration-300">Men's Fashion</p>
              </NavLink>
            </div>
            <div className="pl-6 sm:pl-0 hover:bg-lightpurple xs:hidden">
              <NavLink
                to="/home-appliances"
                className="menu-blogs group whitespace-nowrap"
              >
                <RiHomeOfficeFill size={25} className=" inline sm:ml-2 group-hover:scale-125 transition duration-150" />
                <p className="inline sm:ml-6 sm:invisible sm:group-hover:visible sm:group-hover:text-white sm:group-hover:bg-lightpurple sm:group-hover:p-1 sm:group-hover:rounded-md pl-3 transition-all duration-300">Home Appliances</p>
              </NavLink>
            </div>
            <div className="pl-6 sm:pl-0 hover:bg-lightpurple xs:hidden">
              <NavLink
                to="/toys"
                className="menu-blogs group whitespace-nowrap"
              >
                <RiBearSmileFill size={25} className="inline sm:ml-2 group-hover:scale-125 transition duration-150" />
                <p className="inline sm:ml-6 sm:invisible sm:group-hover:visible sm:group-hover:text-white sm:group-hover:bg-lightpurple sm:group-hover:p-1 sm:group-hover:rounded-md pl-3 transition-all duration-300">Toys</p>
              </NavLink>
            </div>
            <div className="pl-6 sm:pl-0 hover:bg-lightpurple">
              <NavLink
                to="/books"
                className="menu-blogs  whitespace-nowrap  group"
              >
                <SiBookstack size={25} className="  inline sm:ml-2 group-hover:scale-125 transition duration-150" />
                <p className="inline sm:ml-6 sm:invisible sm:group-hover:visible sm:group-hover:text-white sm:group-hover:bg-lightpurple sm:group-hover:p-1 sm:group-hover:rounded-md pl-3 transition-all duration-300">Books</p>
              </NavLink>
            </div>
            <div className="pl-6 sm:pl-0 hover:bg-lightpurple">
              <NavLink
                to="/mobiles&devices"
                className="menu-blogs  whitespace-nowrap group"
              >
                <FaMobileAlt size={25} className=" inline sm:ml-2 group-hover:scale-125 transition duration-150" />
                <p className="inline sm:ml-6 sm:invisible sm:group-hover:visible sm:group-hover:text-white sm:group-hover:bg-lightpurple sm:group-hover:p-1 sm:group-hover:rounded-md pl-3 transition-all duration-300">Mobiles & Devices</p>
              </NavLink>
            </div>
            <div className="pl-6 sm:pl-0 hover:bg-lightpurple">
              <NavLink
                to="/blogs"
                className="menu-blogs  whitespace-nowrap group"
              >
                <MdEditNote size={25} className="inline sm:ml-2 group-hover:scale-125 transition duration-150"/>
                <p className="inline sm:ml-6 sm:invisible sm:group-hover:visible sm:group-hover:text-white sm:group-hover:bg-lightpurple sm:group-hover:p-1 sm:group-hover:rounded-md pl-3 transition-all duration-300">Blogs</p>
              </NavLink>
            </div>
            <div className="pl-6 sm:pl-0 hover:bg-lightpurple">
              <NavLink
                to="/contact"
                className="menu-contact group  whitespace-nowrap "
              >
                <FaEnvelope size={25} className=" inline sm:ml-2 group-hover:scale-125 transition duration-150" />
                <p className="inline sm:ml-6 sm:invisible sm:group-hover:visible sm:group-hover:text-white sm:group-hover:bg-lightpurple sm:group-hover:p-1 sm:group-hover:rounded-md pl-3 transition-all duration-300">Contact</p>
              </NavLink>
            </div>
          </div>
        </div>
        </>
    )
}

export default sidebar;