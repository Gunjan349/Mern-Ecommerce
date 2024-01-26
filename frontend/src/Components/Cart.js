import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <>
      <div>
        <h1 className="ml-8 text-pink sm:text-xl text-3xl font-bold mt-5">
          Shopping Cart
        </h1>
        <div className="cart-content mt-12 mx-44">
          <div className="grid grid-cols-3 shadow-lg rounded-md sm:grid-cols-1">
            <div className="first  bg-white flex p-6 justify-between col-span-2">
              <div className="flex flex-col gap-y-10">
                <img
                  src="images/guitar1.jpg"
                  className="flex justify-center w-24"
                ></img>
                <img
                  src="images/guitar1.jpg"
                  className="flex justify-center w-24"
                ></img>
              </div>
              <div className="flex flex-col gap-y-32">
                <p className="flex justify-center font-bold text-xl">Guitar</p>
                <p className="flex justify-center font-bold text-xl">Guitar</p>
              </div>
              <div className="flex flex-col gap-y-32">
                <input
                  type="number"
                  name=""
                  id=""
                  className="form-control bg-lightgrey border border-gray-400 px-2 text-black w-12 rounded-md focus:outline-gray-500 focus:ring-gray-500"
                  min={1}
                  max={10}
                  value={1}
                />
                <input
                  type="number"
                  name=""
                  id=""
                  className="form-control bg-lightgrey border border-gray-400 px-2 text-black w-12 rounded-md focus:outline-gray-500 focus:ring-gray-500"
                  min={1}
                  max={10}
                  value={1}
                />
              </div>
              <div className="flex flex-col gap-y-32">
                <p className="flex justify-center">$100</p>
                <p className="flex justify-center">$100</p>
              </div>
              <div className="flex flex-col gap-y-[7.5rem]">
                <div className="flex justify-center">
                  <MdOutlineDelete size={30} />
                </div>
                <div className="flex justify-center">
                  <MdOutlineDelete size={30} />
                </div>
              </div>
            </div>
            <div className="second bg-lightpurple flex flex-col gap-y-5 w-full p-6">
              <h1 className=" tracking-wide text-2xl border-b-2 border-lightgrey pb-4">
                Summary
              </h1>
              <div className="flex justify-between">
                <p className="font-bold text-xl">ITEMS 3</p>
                <p className=" font-bold text-xl">$300</p>
              </div>
              <h1 className="font-bold tracking-wide text-xl text-gray-500">
                Shipping
              </h1>
              <div>
                <select className="form-control form-select rounded-md py-1 text-black border-none">
                  <option value="manual" selected="selected">
                    Standard-Delivery-$1
                  </option>
                  <option>Best Selling</option>
                  <option>A-Z</option>
                  <option>Z-A</option>
                  <option>Price, Low to High</option>
                  <option>Price, High to Low</option>
                  <option>Newest First</option>
                  <option>Oldest First</option>
                </select>
              </div>
              <h1 className="font-bold tracking-wide text-xl">Give Code</h1>
              <input
                type="text"
                placeholder="Enter Your Code"
                className="form-control bg-lightgrey border border-gray-400 p-1.5 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
              />
              <div className="flex justify-between border-t-2 border-lightgrey pt-4 mb-3">
                <h1 className="font-bold text-lg">Total price</h1>
                <h1 className="font-bold text-lg">$300</h1>
              </div>
              <div className=" flex justify-end">
                <Link
                  to="/checkout"
                  className="bg-pink px-5 py-3 rounded-full text-white hover:bg-lightpurple w-fit"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
          <Link to="/" className="flex gap-x-3 mt-10">
            <FaArrowLeftLong className="text-pink" size={25}/>
            <h1 className="text-pink text-xl font-bold">Continue Shopping</h1>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;
