import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { FaRegHeart } from "react-icons/fa";

const BestSellers = () => {
  return (
    <>
      <div className="wrapper mx-16 lg:mx-8 mt-20 sm:mx-3">
        <div className="heading font-bold text-2xl xs:text-xl mb-6 underline underline-offset-4">
          <h4>Best Deals Today</h4>
        </div>
        <div className="image-wrapper">
          <div className="boxes grid grid-flow-col gap-12 lg:gap-6 sm:grid-flow-row">
            <Link
              className="box1 flex bg-white h-80 rounded-md p-8 shadow-[0_35px_30px_-15px_rgba(0,0,0,0.3)] lg:p-5"
              to="/"
            >
              <img
                src="images/guitar1.jpg"
                alt="img"
                className="rounded-md  lg:w-52 sm:w-44"
              />
              <div className="content-body relative">
                <div className="content-title text-2xl font-bold mb-3 md:mb-0 leading-10 lg:leading-7 lg:text-xl md:text-lg">
                  Acoustic Guitar Special Discount
                </div>
                <div className="content-desc1 my-3 lg:my-1 xs:hidden">
                  Medellin 38'' Acoustic Guitar with Matt finish
                </div>
                <div className="stars xs:hidden">
                  <ReactStars
                    count={5}
                    size={28}
                    value="3"
                    edit={false}
                    activeColor="#ffd700"
                  />
                </div>
                <div className="leading-10">
                  <div className="price text-lg text-red-600 sm:mt-0">$50</div>
                  <div className="flex items-center gap-x-8  md:gap-x-4 mt-3 lg:mt-0">
                    <FaRegHeart
                      size={25}
                      className="absolute right-0 bottom-0"
                    />
                    <Link className="bg-pink text-white px-2  md:px-1 rounded-lg hover:underline sm:mt-2 " to="/cart">
                      Add to cart
                    </Link>
                  </div>
                </div>
              </div>
            </Link>

            <Link
              className="box1 flex bg-white h-80 rounded-md p-8 shadow-[0_35px_30px_-15px_rgba(0,0,0,0.3)] lg:p-5"
              to="/"
            >
              <img
                src="images/watch1.jpg"
                alt="img"
                className="rounded-md  lg:w-52 "
              />
              <div className="content-body relative">
                <div className="content-title text-2xl font-bold mb-3 md:mb-0 leading-10 lg:leading-7 lg:text-xl md:text-lg">
                  Acoustic Guitar Special Discount
                </div>
                <div className="content-desc1 my-3 lg:my-1 xs:hidden">
                  Medellin 38'' Acoustic Guitar with Matt finish
                </div>
                <div className="stars xs:hidden">
                  <ReactStars
                    count={5}
                    size={28}
                    value="3"
                    edit={false}
                    activeColor="#ffd700"
                  />
                </div>
                <div className="leading-10">
                  <div className="price text-lg text-red-600 sm:mt-0">$50</div>
                  <div className="flex items-center gap-x-8  md:gap-x-4 mt-3 lg:mt-0">
                    <FaRegHeart
                      size={25}
                      className="absolute right-0 bottom-0"
                    />
                    <Link className="bg-pink text-white px-2  md:px-1 rounded-lg hover:underline sm:mt-2 " to="/cart">
                      Add to cart
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
            
          </div>
          <div className="see-more mt-5 text-sky-800 text-xl">
              <Link to="/bestdeals" className="hover:text-pink ">
                Explore Now
              </Link>
            </div>
        </div>
      </div>
    </>
  );
};

export default BestSellers;
