import React from 'react';
import ProductSidebar from './ProductSidebar';


const WomenFashion = () =>{
    return(
        <>
        <h1 className="ml-8 text-pink sm:text-lg text-3xl font-bold mt-5">Women's Fashion</h1>
            <div className="women-fashion flex mt-10">
        <ProductSidebar />
      </div>
        </>
    );
};

export default WomenFashion;