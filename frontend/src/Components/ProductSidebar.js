import React, { useRef } from "react";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Products from "./Products";
import Color from "./FilterColor";
import Sizes from "./Sizes";

const ProductSidebar = () => {
  const [open, setopen] = useState(false);
  const toggle = () => {
    setopen(!open);
  };

  const [changeColor, setChangeColor] = useState("");
  const [changeSize, setChangeSize] = useState("");

  const productRef = useRef();

  return (
    <>
      <div className="grid">
        <button
          className="absolute bg-brown w-10 h-10 rounded-full flex justify-center items-center transition-all duration-1000 text-white z-10 right-16 sm:right-2 mt-1 cursor-pointer"
          onClick={toggle}
        >
          {open ? <IoIosArrowForward /> : <IoIosArrowBack />}
        </button>
        <div
          className={`sidebar ${
            open ? "w-screen" : "w-0"
          } transition-all  duration-1000 ease-in-out`}
        >
          <div
            className={`filter shadow-lg bg-purple text-white leading-8 p-3 duration-300 ${
              !open && "hidden"
            }`}
          >
            <h3 className="Filterby font-semibold text-xl border-b-2 border-lightpurple pb-2">
              Filter By
            </h3>

            <div className="colour border-b-2 border-lightpurple pb-2">
              <h5 className="sub-title py-2 font-semibold text-lg mt-4">Colours</h5>
              <ul className="flex flex-wrap gap-4 mt-1">
                {Color &&
                  Color.length > 0 &&
                  Color.map((color) => {
                    const isSelected = color === changeColor;
                    return (
                      <li
                        key={color}
                        onClick={() => {
                          setChangeColor(color);
                          productRef.current.handleColor(color);
                        }}
                        className={`h-5 w-5 rounded-md transition-all cursor-pointer ${
                          isSelected
                            ? "border-2 border-white scale-110"
                            : "border-none"
                        }`}
                        style={{ background: color }}
                      ></li>
                    );
                  })}
              </ul>
            </div>
            <div className="size">
              <h5 className="sub-title py-2 font-semibold text-lg mt-4">Size</h5>
              <ul className="flex flex-wrap gap-4 mt-1">
                {Sizes &&
                  Sizes.length > 0 &&
                  Sizes.map((size) => {
                    const isSelected = size.value === changeSize;
                    return (
                      <li
                        key={size.value}
                        onClick={() => {
                          setChangeSize(size.value);
                          productRef.current.handleSize(size.value);
                        }}
                        className={`border-lightpurple border-solid px-3 rounded-md transition-all cursor-pointer ${
                          isSelected
                            ? "border-2 bg-lightpurple text-white scale-110"
                            : "border-2"
                        }`}
                      >
                        {size.value}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
        <div className={`${open ? "mt-10" : "mt-0"}`}>
          <Products color={changeColor} size={changeSize} ref={productRef} />
        </div>
      </div>
    </>
  );
};

export default ProductSidebar;