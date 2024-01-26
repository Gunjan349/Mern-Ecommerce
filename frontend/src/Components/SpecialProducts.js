import React from 'react';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';

const SpecialProduct = () =>{
    return(
        <>
             <div className="heading underline underline-offset-4 text-2xl font-bold mx-16 mt-20 mb-6 sm:mx-3">Best Products</div>
            <div className="marquee-wrapper mx-16 bg-white shadow-inner shadow-[#0000001a] rounded-md py-8 sm:py-4">
                <div className="container rounded-md">
                            <Marquee className='flex gap-x-5'>
                                <Link to="/"  className='max-w-xs'>
                                    <img src="images/pot1.webp"/>
                                </Link>
                                <Link to="/" className='max-w-xs'>
                                    <img src="images/pot1.webp"/>
                                </Link>
                                <Link to="/" className='max-w-xs'>
                                    <img src="images/pot1.webp"/>
                                </Link>
                                <Link to="/" className='max-w-xs'>
                                    <img src="images/pot1.webp"/>
                                </Link>
                                <Link to="/" className='max-w-xs'>
                                    <img src="images/pot1.webp"/>
                                </Link>
                                <Link className='max-w-xs'>
                                    <img src="images/pot1.webp"/>
                                </Link>
                                <Link to="/" className='max-w-xs'>
                                    <img src="images/pot1.webp"/>
                                </Link>
                            </Marquee>
                </div>
            </div>
        </>
    )
};

export default SpecialProduct;