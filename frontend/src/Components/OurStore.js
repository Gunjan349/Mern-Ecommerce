import React from "react";
import { Link } from "react-router-dom";
import ProductSidebar from "./ProductSidebar";



const OurStore = () => {
  
  return (
    <>
    <h1 className="ml-8 text-pink sm:text-lg text-3xl font-bold mt-5">Our Store</h1>
      <div className="our-store flex mt-10">
        <ProductSidebar />
      </div>
    </>
  );
};

export default OurStore;
