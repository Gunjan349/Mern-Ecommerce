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
            <Marquee className="py-5 fixed bg-white">
                
                    <div className="delivery flex gap-4 items-center px-20">
                        <TbTruckDelivery size={30}/>
                        <div>
                        <p className='font-bold'>Free Delivery</p>
                        
                        </div>
                    </div>
                    <div className="gift flex gap-4 items-center px-20">
                        <IoGiftOutline size={30}/>
                       <div>
                       <p className='font-bold'>Daily Surprises</p>
                        
                       </div>
                    </div>
                    <div className="support flex gap-4 items-center px-20">
                        <TfiHeadphoneAlt size={30}/>
                        <div>
                        <p className='font-bold'>20/7 Support</p>
                       
                        </div>
                    </div>
                    <div className="prices flex gap-4 items-center px-20">
                        <PiSealCheck size={30}/>
                       <div>
                       <p className='font-bold'>Affordable Prices</p>
                       
                       </div>
                    </div>
                    <div className="payment flex gap-4 items-center px-20">
                        <FaRegCreditCard size={30}/>
                       <div>
                       <p className='font-bold'>Secure Payment</p>
                       
                       </div>
                    </div>
                
            </Marquee>
        </>
    )
};

export default HomeMarquee;