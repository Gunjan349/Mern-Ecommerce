import React from "react";
import ProductSidebar from "./ProductSidebar";

const MainToys = () => {
  return (
    <>
      <h1 className="ml-8 text-pink sm:text-lg text-3xl font-bold mt-5">
        Toys
      </h1>
      <div className="toys flex mt-10">
        <ProductSidebar />
      </div>
    </>
  );
};

export default MainToys;
