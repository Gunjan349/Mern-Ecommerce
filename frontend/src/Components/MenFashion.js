import React from 'react';
import ProductSidebar from './ProductSidebar';

const MenFashion = () =>{
    return (
        <>
        <h1 className="ml-8 text-pink sm:text-lg text-3xl font-bold mt-5">Men's Fashion</h1>
             <div className="men-fashion flex mt-10">
        <ProductSidebar />
      </div>
        </>
    );
};

export default MenFashion;