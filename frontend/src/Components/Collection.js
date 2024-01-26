import React from "react";
import ProductSidebar from "./ProductSidebar";

const Collection = () => {
  return (
    <>
      <h1 className="ml-8 text-pink sm:text-lg text-3xl font-bold mt-5">
        Featured Collection
      </h1>
      <div className="collection flex mt-10">
        <ProductSidebar />
      </div>
    </>
  );
};

export default Collection;
