import React from "react";
import ProductSidebar from "./ProductSidebar";

const HomeApp = () => {
  return (
    <>
      <h1 className="ml-8 text-pink sm:text-lg text-3xl font-bold mt-5">
        Home Appliances
      </h1>
      <div className="home-appliances flex mt-10">
        <ProductSidebar />
      </div>
    </>
  );
};

export default HomeApp;
