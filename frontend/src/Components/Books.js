import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { FaRegHeart } from "react-icons/fa";

const Books = () => { 
  return (
    <>
      <div className="wrapper bg-lightgrey mx-16 lg:mx-8 mt-20">
        <div className="heading font-bold text-2xl xs:text-xl mb-6 underline underline-offset-4">
          <h4>Books</h4>
        </div>
        <div className="image-wrapper">
          <div className="boxes grid grid-cols-4 gap-5 sm:grid-cols-2">
          <Link className="box4 relative overflow-hidden group" to="/">
              <img src="images/pot1.webp" alt="img" className="rounded-md" />
              <div className="content-body h-[100%] w-[100%] absolute top-0  -right-[100%]  bg-[#1f3d4738] backdrop-blur-sm rounded-md text-lg p-7 lg:p-2 leading-8 lg:leading-6 group-hover:right-0 duration-700">
                <div className="content-title text-2xl lg:text-lg font-bold mb-3">
                  Acoustic Guitar
                </div>
                <div className="content-desc xs:hidden">
                  Medellin 38'' Acoustic Guitar with Matt finish
                </div>
                <ReactStars
                  count={5}
                  size={24}
                  value="3"
                  edit={false}
                  activeColor="#ffd700"
                />
                <div className="price">$450</div>
              </div>
            </Link>
            <Link className="box4 relative overflow-hidden group" to="/">
              <img src="images/pot1.webp" alt="img" className="rounded-md" />
              <div className="content-body h-[100%] w-[100%] absolute top-0  -right-[100%]  bg-[#1f3d4738] backdrop-blur-sm rounded-md text-lg p-7 lg:p-2 leading-8 lg:leading-6 group-hover:right-0 duration-700">
                <div className="content-title text-2xl lg:text-lg font-bold mb-3">
                  Acoustic Guitar
                </div>
                <div className="content-desc xs:hidden">
                  Medellin 38'' Acoustic Guitar with Matt finish
                </div>
                <ReactStars
                  count={5}
                  size={24}
                  value="3"
                  edit={false}
                  activeColor="#ffd700"
                />
                <div className="price">$450</div>
              </div>
            </Link>
            <Link className="box4 relative overflow-hidden group" to="/">
              <img src="images/pot1.webp" alt="img" className="rounded-md" />
              <div className="content-body h-[100%] w-[100%] absolute top-0  -right-[100%]  bg-[#1f3d4738] backdrop-blur-sm rounded-md text-lg p-7 lg:p-2 leading-8 lg:leading-6 group-hover:right-0 duration-700">
                <div className="content-title text-2xl lg:text-lg font-bold mb-3">
                  Acoustic Guitar
                </div>
                <div className="content-desc xs:hidden">
                  Medellin 38'' Acoustic Guitar with Matt finish
                </div>
                <ReactStars
                  count={5}
                  size={24}
                  value="3"
                  edit={false}
                  activeColor="#ffd700"
                />
                <div className="price">$450</div>
              </div>
            </Link>
            <Link className="box4 relative overflow-hidden group" to="/">
              <img src="images/pot1.webp" alt="img" className="rounded-md" />
              <div className="content-body h-[100%] w-[100%] absolute top-0 -right-[100%] bg-[#1f3d4738] backdrop-blur-sm rounded-md text-lg p-7 leading-8 group-hover:right-0 duration-700">
                <div className="content-title text-2xl font-bold mb-3">
                  Acoustic Guitar
                </div>
                <div className="content-desc">
                  Medellin 38'' Acoustic Guitar with Matt finish
                </div>
                <ReactStars
                  count={5}
                  size={24}
                  value="3"
                  edit={false}
                  activeColor="#ffd700"
                />
                <div className="price">$450</div>
              </div>
            </Link>
          </div>
        </div>
        <div className="see-more mt-5 text-sky-800 text-xl">
          <Link to="/books" className="hover:text-pink ">
            See more...
          </Link>
        </div>
      </div>
    </>
  );
};

export default Books;
