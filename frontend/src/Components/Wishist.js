import React from "react";
import { CiHeart } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";


const Wishlist = () => {
  return (
    <>
      <div>
        <div className="heading text-center mt-10 bg-purple text-white py-7 flex flex-col gap-y-3">
          <div className="flex justify-center">
            <CiHeart size={35}/>
          </div>
          <h1 className="text-xl font-bold tracking-wider">Your Wishlist</h1>
         <div>
         <p>
            If you've added products to your wishist , you can find them below
          </p>
          <p>and purchase them right away.</p>
         </div>
        </div>
        <div className="wishlist-content mt-12 mx-44">
            <h1 className="font-bold text-lg tracking-wide">Products Wishlisted</h1>
            <div className="wishlist-container shadow-lg bg-white grid grid-cols-7 p-4 rounded-md mt-10 sm:grid-cols-6">
            <div className="flex flex-col gap-y-16">
                <h1 className="invisible">Remove</h1>
                <div className="flex justify-center">
                <RxCross2 size={20}/>
                </div>
                <div className="flex justify-center">
                <RxCross2 size={20}/>
                </div>
            </div>
            <div className="flex flex-col gap-y-6">
                <h1 className="invisible">Image</h1>
                <img src="images/guitar1.jpg" className="flex justify-center h-20"></img>
                <img src="images/guitar1.jpg" className="flex justify-center h-20"></img>
            </div>
            <div className="flex flex-col gap-y-16">
                <h1 className="flex justify-center font-bold text-lg">Name</h1>
                <p className="flex justify-center">Guitar</p>
                <p className="flex justify-center">Guitar</p>
            </div>
            <div className="flex flex-col gap-y-16">
                <h1 className="flex justify-center font-bold text-lg">Price</h1>
                <p className="flex justify-center">$100</p>
                <p className="flex justify-center">$100</p>
            </div>
            <div className="date flex flex-col gap-y-16 sm:hidden">
                <h1 className="flex justify-center font-bold text-lg flex-wrap">Date
                </h1>
                <p className="flex justify-center flex-wrap">Jan 22 ,24</p>
                <p className="flex justify-center flex-wrap">Jan 22 ,24</p>
            </div>
            <div className="flex flex-col gap-y-16">
                <h1 className="flex justify-center font-bold text-lg flex-wrap">Stock</h1>
                <div className="flex justify-center text-pink">
                    <FaCheck size={20} />
                </div>
                <div className="flex justify-center text-pink">
                    <FaCheck size={20} />
                </div>
                
            </div>
            <div className="flex flex-col gap-y-16">
                <h1 className="invisible">Add</h1>
                <button className=" text-pink font-bold">ADD TO CART</button>
                <button className=" text-pink font-bold">ADD TO CART</button>
            </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
