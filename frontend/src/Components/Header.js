import React from "react";
import "../App.css";

import { NavLink, Link } from "react-router-dom";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

const Header = () => {
  return (
    <>
      <header className="">
        <div className="heading  bg-purple border-y px-7 text-white  text-lg py-1 flex justify-between items-center xs:px-2 xs:text-lg xs:flex-col sm:px-4  lg:px-7">
          <p className="inline">
            anytime anywhere
            <p className="inline ml-2 text-pink">nearYou</p>
          </p>
          <div className="phone flex  items-center gap-1">
            <FaPhoneVolume className="" />
            <p> xxxxxxxxxx</p>
          </div>
        </div>
        <div className="nav-bar pt-4 pb-2 text-purple  px-6 md:px-4 flex border-b sm:border-b-0">
          <div className="search bg-purple py-1 px-2 rounded-full flex items-center group sm:mt-14">
            <a className="btn">
              <IoIosSearch size={32} className="text-white" />
            </a>
            <input
              type="text"
              placeholder="Search Products..."
              className="input border-none group-hover:px-2 w-0 outline-0 bg-transparent transition-all ease-linear duration-300 placeholder-white text-white text-lg group-hover:w-52 sm:group-hover:w-64 sm:text-base"
            />
          </div>
          <div className="logo-div">
            <logo className="text-4xl text-[#e36422]">nearYou</logo>
          </div>
          <div className="nav-right flex items-center gap-14  xs:gap-8">
            <Link className="wishlist" to="/wishist">
              <FaRegHeart size={25} className="hover:scale-75 duration-500"/>
            </Link>
            <Link className="user" to="/login">
              <FaRegUser size={25} className="hover:scale-75 duration-500"/>
            </Link>
            <Link className="cart" to="/cart">
              <IoCartOutline size={35} className="hover:scale-75 duration-500"/>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
