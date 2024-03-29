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
        <buton
          className="absolute bg-brown w-10 h-10 rounded-full flex justify-center items-center transition-all duration-1000   text-white z-10 right-16 sm:right-2"
          onClick={toggle}
        >
          <IoIosArrowBack />
          <IoIosArrowForward />
        </buton>
        <div
          className={`sidebar ${
            open ? "w-screen" : "w-0"
          } transition-all  duration-1000 ease-in-out
          `}
        >
          <div
            className={`filter rounded-md shadow-lg bg-purple text-white leading-8 p-3 duration-300 ${
              !open && "hidden"
            }`}
          >
            <h3 className="Filterby font-bold text-xl border-b-2 border-lightpurple pb-2">
              Filter By
            </h3>

            <div className="colour border-b-2 border-lightpurple pb-2">
              <h5 className="sub-title py-2 font-bold text-lg mt-4">Colours</h5>
              <ul className="flex flex-wrap gap-4 mt-3 ">
                {Color &&
                  Color.length > 0 &&
                  Color.map((color) => {
                    return (
                      <li
                        onClick={() => {
                          setChangeColor(color);
                          productRef.current.handleColor();
                        }}
                        className="h-5 w-5 rounded-md"
                        style={{ background: color }}
                      ></li>
                    );
                  })}
              </ul>
            </div>
            <div className="size">
              <h5 className="sub-title py-2 font-bold text-lg mt-4">Size</h5>
              <ul className="flex flex-wrap gap-4 mt-3">
                {Sizes &&
                  Sizes.length > 0 &&
                  Sizes.map((size) => {
                    return (
                      <li
                        onClick={() => {
                          setChangeSize(size.value);
                          productRef.current.handleSize();
                        }}
                        className="border-lightpurple border-solid border-2 px-3 rounded-md"
                      >
                        {size.value}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
        <div className={`${open ? "mt-16" : "mt-0"}`}>
          <Products  color={changeColor} size={changeSize} ref={productRef} />
        </div>
      </div>
    </>
  );
};

export default ProductSidebar;
