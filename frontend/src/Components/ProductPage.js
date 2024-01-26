import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import Products from "./Products";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";

const ProductPage = () => {
  const [reached, setreached] = useState(true);
  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  return (
    <>
      <div className=" main-product mx-44 mt-10">
        <div className="mb-24  bg-white p-6 rounded-md grid grid-cols-2 md:grid-cols-1">
          <div className="product-left border-r-2 border-gray-200 pb-12 md:border-none">
            <div className="main-image md:flex md:justify-center">
            <img
              src="images/guitar1.jpg"
              alt="image"
              className="rounded-md lg:w-96"
            ></img>
            </div>
            <h1 className="font-medium text-lg mt-7 mb-3">Similar Products</h1>
            <div className="other-images flex flex-wrap gap-x-5 gap-y-5">
              <img
                src="images/guitar1.jpg"
                alt="image"
                className="rounded-lg h-28 border-2 border-pink"
              ></img>
              <img
                src="images/guitar1.jpg"
                alt="image"
                className="rounded-lg h-28 border-2 border-pink"
              ></img>
              <img
                src="images/guitar1.jpg"
                alt="image"
                className="rounded-lg h-28 border-2 border-pink"
              ></img>
            </div>
          </div>
          <div className="product-right ml-12 flex flex-col gap-y-3 lg:ml-4">
            <div className="heading font-bold text-3xl tracking-wide">
              Acoustic Guitar
            </div>
            <div className="description text-lg text-gray-500">
              Medellin 38'' Acoustic Guitar with Matt finish
            </div>
            <div className="price font-bold text-lg text-red-500">$200</div>
            <div className="ratings flex gap-x-4 items-center">
              <ReactStars
                count={5}
                size={24}
                value="3"
                edit={false}
                activeColor="#ffd700"
              />
              <p className="text-lg text-gray-500">(Based on 50% reviews)</p>
            </div>
            <a href="#review" className="text-lg font-bold tracking-wide">Write Review</a>
            <div className="flex gap-x-2">
              <h1 className="font-bold text-lg">Type :</h1>
              <h2 className="text-lg">Guitar</h2>
            </div>
            <div className="flex gap-x-2">
              <h1 className="font-bold text-lg">Brand :</h1>
              <h2 className="text-lg">Yamaha</h2>
            </div>
            <div className="flex gap-x-2">
              <h1 className="font-bold text-lg">Avaibility :</h1>
              <h2 className="text-lg">5 left</h2>
            </div>
            <div>
              <h1 className="font-bold text-lg mb-3">Size :</h1>
              <ul className="flex gap-x-4">
                <li className="border-2 border-gray-200 py-1 px-3 rounded-md text-lg">
                  S
                </li>
                <li className="border-2 border-gray-200 py-1 px-3 rounded-md text-lg">
                  M
                </li>
                <li className="border-2 border-gray-200 py-1 px-3 rounded-md text-lg">
                  L
                </li>
                <li className="border-2 border-gray-200 py-1 px-3 rounded-md text-lg">
                  XL
                </li>
              </ul>
            </div>
            <div className="colour mt-3">
              <h2 className="font-bold mb-3 text-lg">Colour :</h2>
              <ul className="flex gap-x-4">
                <li className="p-3 bg-red-500 border-2 border-red-500 rounded-lg"></li>
                <li className="p-3 bg-black border-2 border-black rounded-lg"></li>
                <li className="p-3 bg-purple border-2 border-purple rounded-lg"></li>
              </ul>
            </div>
            <div className="quantity flex gap-x-4 mt-3">
              <h1 className="font-bold text-lg">Quantity :</h1>
              <input
                type="number"
                name=""
                id=""
                className="form-control bg-lightgrey border border-gray-400 px-2 text-black w-12 rounded-md focus:outline-gray-500 focus:ring-gray-500"
                min={1}
                max={10}
              />
            </div>
            <div className="flex gap-x-8 items-center mt-3">
              <button className="text-white bg-pink rounded-full hover:bg-lightpurple py-2 px-5">
                Add To Cart
              </button>
              <Link
                to="/"
                className="text-white bg-lightpurple rounded-full hover:bg-pink py-2 px-5"
              >
                Buy Now
              </Link>
              <FaRegHeart size={25} />
            </div>
            <div className="share flex mt-3 gap-x-3">
              <h3 className="font-bold text-lg-">Share :</h3>
              <a
                href="javascrip:void(0);"
                onClick={() => {
                  copyToClipboard("link");
                }}
              >
                Copy Link
              </a>
            </div>
          </div>
        </div>
        <div className="description bg-white shadow-lg p-7 gap-y-3 rounded-md mb-16">
          <h1 className="font-bold text-xl tracking-wide mb-3">Description</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            sed rerum laborum perferendis soluta at saepe velit dolores corporis
            nostrum, eum voluptatem molestias minus accusamus quos maiores
            voluptatum ut necessitatibus. Blanditiis, culpa aut molestias
            laudantium quos veritatis sit, officia voluptate accusantium
            expedita quasi corporis exercitationem ipsam beatae, saepe illo? At.
          </p>
        </div>
        <div className="reviews bg-white shadow-lg p-7 gap-y-3 rounded-md">
          <div className="review-heading flex justify-between border-b-2 border-gray-200 pb-2">
            <div>
              <h1 className="font-bold text-xl tracking-wide">
                {" "}
                Customer Reviews
              </h1>
              <ReactStars
                count={5}
                size={20}
                value="3"
                edit={false}
                activeColor="#ffd700"
              />
              <p>Based on 50% reviews</p>
            </div>
            {reached && (
              <div>
                <a href="" className="hover:underline">
                  Write your Review
                </a>
              </div>
            )}
          </div>
          <div
            className="review-form mt-10 border-b-2 border-gray-200 pb-10"
            id="review"
          >
            <h1 className="font-bold text-lg tracking-wide">
              Write your review
            </h1>
            <form action="" className="flex flex-col gap-7 mt-10">
              <div>
                <input
                  type="text"
                  className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
                  placeholder="Name"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
                  placeholder="Email"
                />
              </div>
              <div>
                <input
                  type="text"
                  className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
                  placeholder="Title"
                />
              </div>
              <div>
                <h1 className="text-gray-500 mb-2">Rating</h1>
                <ReactStars
                  count={5}
                  size={20}
                  value="0"
                  edit={true}
                  activeColor="#ffd700"
                />
              </div>
              <div>
                <textarea
                  className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
                  cols="30"
                  rows="4"
                  placeholder="Review..."
                ></textarea>
              </div>
              <div>
                <button className="bg-pink px-5 py-3 rounded-full text-white hover:bg-lightpurple float-right">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="submitted-reviews mt-10">
            <div className="first-review">
              <h1 className="font-bold tracking-wide text-xl underline underline-offset-4">
                Gunjan
              </h1>
              <ReactStars
                count={5}
                size={20}
                value="3"
                edit={false}
                activeColor="#ffd700"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                maxime voluptas sapiente. Architecto qui nam a assumenda.
                Provident, fugiat consectetur.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <h1 className="font-bold text-3xl tracking-wide">
            You may also like
          </h1>
          <Products />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
