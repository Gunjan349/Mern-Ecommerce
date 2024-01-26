import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import MultiRangeSlider from "multi-range-slider-react";
import Products from "./Products";

const ProductSidebar = () => {
    const [open , setopen] = useState(false)
    const toggle = ()=>{
        setopen(!open)
    }
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(20000);
  const handleInput = (e) => {
    setMin(e.min);
    setMax(e.max);
  };

  return (
    <>
      <div className="side flex">
      <buton className="absolute bg-pink w-10 h-10 rounded-full flex justify-center items-center duration-300 right-16 bottom-2 text-white z-10" onClick = {toggle}><IoIosArrowBack /><IoIosArrowForward /></buton>
        <div className={`sidebar ${open ? 'w-72' : 'w-0'} relative duration-700 ease-in-out sm:mr-10 z-90 sm:${open ? 'w-screen' : 'w-0'}`}>
          <div className={`filter rounded-md shadow-lg bg-purple text-white leading-8 p-3 duration-300 ${!open && 'invisible'}`}>
            <h3 className="Filterby font-bold text-xl border-b-2 border-lightpurple pb-2">
              Filter By
            </h3>
            <div className="available leading-10 border-b-2 border-lightpurple pb-2">
              <h5 className="sub-title py-2 font-bold text-lg mt-4">
                Available
              </h5>
              <div className="checkbox">
                <input
                  className="mr-2 checked:accent-pink"
                  type="checkbox"
                  value=""
                  id=""
                />
                <label htmlFor="">In Stock</label>
              </div>
              <div className="checkbox">
                <input
                  className="mr-2 checked:accent-pink"
                  type="checkbox"
                  value=""
                  id=""
                />
                <label htmlFor="">Out of Stock</label>
              </div>
            </div>
            <div className="price border-b-2 border-lightpurple pb-2">
              <h5 className="sub-title py-2 font-bold text-lg mt-4">Price</h5>
              <div className="slider">
                <MultiRangeSlider
                  min={0}
                  max={20000}
                  step={100}
                  minValue={min}
                  maxValue={max}
                  barInnerColor="#c5a1ec"
                  ruler={false}
                  onInput={(e) => {
                    handleInput(e);
                  }}
                />
              </div>
            </div>
            <div className="colour border-b-2 border-lightpurple pb-2">
              <h5 className="sub-title py-2 font-bold text-lg mt-4">Colours</h5>
              <ul className="flex flex-wrap gap-4 mt-3 ">
                <li className="h-5 w-5 rounded-md bg-black"></li>
                <li className="h-5 w-5 rounded-md bg-gray-200"></li>
                <li className="h-5 w-5 rounded-md bg-red-500"></li>
                <li className="h-5 w-5 rounded-md bg-yellow-400"></li>
                <li className="h-5 w-5 rounded-md bg-green-600"></li>
                <li className="h-5 w-5 rounded-md bg-orange-300"></li>
                <li className="h-5 w-5 rounded-md bg-blue-200"></li>
              </ul>
            </div>
            <div className="size">
              <h5 className="sub-title py-2 font-bold text-lg mt-4">Size</h5>
              <ul className="flex flex-wrap gap-4 mt-3">
                <li className="border-lightpurple border-solid border-2 px-3 rounded-md">
                  XS
                </li>
                <li className="border-lightpurple border-solid border-2 px-3 rounded-md">
                  S
                </li>
                <li className="border-lightpurple border-solid border-2 px-3 rounded-md">
                  M
                </li>
                <li className="border-lightpurple border-solid border-2 px-3 rounded-md">
                  L
                </li>
                <li className="border-lightpurple border-solid border-2 px-3 rounded-md">
                  XL
                </li>
                <li className="border-lightpurple border-solid border-2 px-3 rounded-md">
                  XXL
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={`main ml-10 mr-10 sm:${open ? 'hidden' : 'visible'} duration-300`}>
          <div className="sort flex items-center bg-purple text-white px-5 py-3 gap-x-4 rounded-lg ">
            <h4 className="font-bold text-lg sm:text-md">Sort By</h4>
            <div>
              <select className="form-control form-select rounded-md py-1 text-black border-none">
                <option value="manual" selected="selected">
                  Featured
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
          </div>
          <div className="main-products">
            <Products />
            <Products />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSidebar;
