import React from 'react';
import Marquee from 'react-fast-marquee'
import { IoGiftOutline } from "react-icons/io5";
import { FaRegCreditCard } from "react-icons/fa6";
import { PiSealCheck } from "react-icons/pi";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { TbTruckDelivery } from "react-icons/tb";

const HomeMarquee = () =>{
    return(
        <>
            <Marquee>
                <div className='home-marquee bg-white mt-14 flex justify-between py-6 w-screen items-center xs:gap-x-6'>
                    <div className="delivery flex gap-4 items-center pl-10 xl:pl-20">
                        <TbTruckDelivery size={30}/>
                        <div>
                        <p className='font-bold'>Free Delivery</p>
                        
                        </div>
                    </div>
                    <div className="gift flex gap-4 items-center">
                        <IoGiftOutline size={30}/>
                       <div>
                       <p className='font-bold'>Daily Surprises</p>
                        
                       </div>
                    </div>
                    <div className="support flex gap-4 items-center md:hidden">
                        <TfiHeadphoneAlt size={30}/>
                        <div>
                        <p className='font-bold'>24/7 Support</p>
                       
                        </div>
                    </div>
                    <div className="prices flex gap-4 items-center">
                        <PiSealCheck size={30}/>
                       <div>
                       <p className='font-bold'>Affordable Prices</p>
                       
                       </div>
                    </div>
                    <div className="payment flex gap-4 items-center">
                        <FaRegCreditCard size={30}/>
                       <div>
                       <p className='font-bold'>Secure Payment</p>
                       
                       </div>
                    </div>
                </div>
            </Marquee>
        </>
    )
};

export default HomeMarquee;