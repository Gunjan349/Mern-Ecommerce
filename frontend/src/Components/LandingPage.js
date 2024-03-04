import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { FaRegHeart } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import HomeMarquee from "./HomeMarquee";
import BestSellers from "./BestSellers";
import WomenWear from "./WomenWear";
import MenWear from "./MensWear";
import BestProducts from "./BestProducts";
import HomeAppliances from "./HomeAppliances";
import Toys from "./Toys";
import FeaturedCollection from "./FeaturedCollection";
import Books from "./Books";
import Mobiles from "./Mobiles"

const LandingPage = () => {
  return (
    <>
      <div>
        <Navbar className="relative" />

        <div className="absolute">
          
            <div className="w-screen">
              <img src="images/fashion4.jpg" className="w-full" />
            </div>
         
        </div>
      </div>
      <div className="relative float-right mt-2 text-brown flex items-center gap-x-10 mr-6 xs:mr-4">
        <Link className="wishlist" to="/wishist">
          <FaRegHeart size={25} className="hover:scale-75 duration-500" />
        </Link>
        <Link className="cart" to="/cart">
          <IoCartOutline size={35} className="hover:scale-75 duration-500" />
        </Link>
      </div>

      <div className="home-heading relative  font-serif float-right mt-48 sm:mt-56 mb-28 xs:mb-6">
        <p className="font-bold tracking-wide text-4xl sm:text-center">
          Wear Confidence With Style
        </p>
        <p className="text-lg tracking-wide text-center mt-3">
          Get all the trendy and affordable deals here.
          <br /> Choose your fashion everyday with
        </p>
        <h3 className="text-brown underline underline-offset-4 text-center ">
          nearYou
        </h3>
      </div>
      <scrollToTop />
      <HomeMarquee />
      <BestSellers />
      <MenWear />
      <WomenWear />
      <BestProducts />
      <Books />
      <Toys />
      <FeaturedCollection />
      <HomeAppliances />
      <Mobiles />
    </>
  );
};

export default LandingPage;
