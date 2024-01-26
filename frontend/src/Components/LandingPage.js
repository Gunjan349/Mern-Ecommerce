import React from "react";
import Corousel from "./Corousel";
import Corousel2 from "./Corousel2";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import HomeMarquee from "./HomeMarquee";
import BestSellers from "./BestSellers";
import WomenWear from "./WomenWear";
import MenWear from './MensWear';
import SpecialProduct from "./SpecialProducts";
import HomeAppliances from './HomeAppliances';
import Toys from './Toys';
import FeaturedCollection from "./FeaturedCollection";
import Books from './Books'; 
import Mobiles from "./Mobiles";

const LandingPage = () => {
  const slides = [
    "images/laptop.png",
    "images/man.jpg",
    "images/headphone.webp",
    "images/makeup.jpg",
    "images/womantop.jpg",
    "images/oven.jpg",
  ];

  const slides2 = [
    "images/makeup.jpg",
    "images/womantop.jpg",
    "images/oven.jpg",
    "images/laptop.png",
    "images/man.jpg",
    "images/headphone.webp",
  ];

  return (
    <>
      <div className="home flex gap-24 md:gap-0">
        <Sidebar />

        <div className="corousels flex items-center gap-x-80 md:gap-x-2 lg:gap-20">
          {/* corousel1 */}
          <div className="corousel1 flex">
            <div className="max-w-sm sm:max-w-md">
              <Corousel autoslide={true}>
                {slides.map((slide) => (
                  <img src={slide} alt="image" className="rounded-full" />
                ))}
              </Corousel>
              <Link
                to="/"
                className="buy1 absolute top-56 sm:top-64 p-3 rounded-xl bg-pink text-white duration-500 animate-bounce shadow-xl"
              >
                Buy Now
              </Link>
            </div>
          </div>
          {/* corousel2 */}
          <div className="corousel2 flex mt-44 mr-[9%] sm:hidden ">
            <div className="max-w-xs">
              <Corousel2 autoslide={true}>
                {slides2.map((slide2) => (
                  <img src={slide2} alt="image" className="rounded-full" />
                ))}
              </Corousel2>
              <Link
                to="/"
                className="absolute top-80  p-3 rounded-xl bg-pink text-white duration-500 animate-bounce shadow-xl"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <HomeMarquee/>
      <BestSellers />
      <WomenWear />
      <MenWear />
      <SpecialProduct />
      <HomeAppliances />
      <Toys />
      <FeaturedCollection />
      <Books />
      <Mobiles />
    </>
  );
};

export default LandingPage;
