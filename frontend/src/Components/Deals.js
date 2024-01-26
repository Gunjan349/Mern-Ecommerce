import React from "react";
import ProductSidebar from "./ProductSidebar";

const Deals = () => {
  return (
    <>
      <h1 className="ml-8 text-pink sm:text-lg text-3xl font-bold mt-5">
        Best Deals Today
      </h1>
      <div className="deals flex mt-10">
        <ProductSidebar />
      </div>
    </>
  );
};

export default Deals;
