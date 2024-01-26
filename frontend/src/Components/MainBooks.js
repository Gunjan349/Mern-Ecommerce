import React from 'react';
import ProductSidebar from './ProductSidebar';

const MainBooks = () =>{
    return (
        <>
        <h1 className="ml-8 text-pink sm:text-lg text-3xl font-bold mt-5">Books</h1>
        <div className="books flex mt-10">
        <ProductSidebar />
      </div>
        </>
    );
};

export default MainBooks;