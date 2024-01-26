import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { FaRegHeart } from "react-icons/fa";

const Products = () => { 
  return (
    <>
      <div className="wrapper bg-lightgrey mt-7 ">
        <div className="products image-wrapper">
          <div className="boxes grid grid-cols-4 gap-5 sm:grid-cols-2 md:grid-cols-3">
            <Link className="box1 relative overflow-hidden group" to="/">
              <img src="images/guitar1.jpg" alt="img" className="rounded-md" />
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
                <FaRegHeart className="absolute bottom-6 right-6"/>
              </div>
            </Link>
            <Link className="box2 relative overflow-hidden group" to="/">
              <img
                src="images/pencilset1.jpg"
                alt="img"
                className="rounded-md"
              />
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
                <FaRegHeart className="absolute bottom-6 right-6"/>
              </div>
            </Link>
            <Link className="box3 relative overflow-hidden group" to="/">
              <img src="images/watch1.jpg" alt="img" className="rounded-md" />
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
                <FaRegHeart className="absolute bottom-6 right-6"/>
              </div>
            </Link>
            <Link className="box4 relative overflow-hidden group md:hidden" to="/">
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
                <FaRegHeart className="absolute bottom-6 right-6"/>
              </div>
            </Link>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Products;
