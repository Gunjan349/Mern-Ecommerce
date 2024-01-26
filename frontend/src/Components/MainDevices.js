import React from 'react';
import ProductSidebar from './ProductSidebar';

const MainDevices = () =>{
    return (
        <>
        <h1 className="ml-8 text-pink sm:text-lg text-3xl font-bold mt-5">Mobiles & Devices</h1>
             <div className="mobiles flex mt-10">
        <ProductSidebar />
      </div>
        </>
    );
};

export default MainDevices;