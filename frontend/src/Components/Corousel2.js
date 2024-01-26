import React , {useEffect, useState} from 'react';
import Marquee from 'react-fast-marquee';

const Corousel2 = ({children : slides2 , autoslide=false, autoslideinterval = 3000}) =>{

    const [curr , setCurr] = useState(0);

    
    const next = () =>
        setCurr((curr) => (curr === slides2.length - 1 ? 0 : curr + 1));

    useEffect(()=>{
        if(!autoslide) return;
        const slideinterval = setInterval(next , autoslideinterval);
        return () => clearInterval(slideinterval);
    
    } , [])

    return(
        <>
        <div className='overflow-hidden rounded-full'>
           <div className='flex transition-transform ease-out duration-500' style = {{transform : `translateX(-${curr * 100}%)`}}>{slides2}</div>
           <Marquee>
          <div className=" mt-3 p-4 font-bold text-2xl ">
            Get 50% off on your first order.
          </div>
        </Marquee>
        </div>
        </>
    )
};


export default Corousel2;