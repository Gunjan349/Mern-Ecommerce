import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserCart = () =>{
    const navigate = useNavigate()  
    const [data , setData] = useState([])

    useEffect(()=>{

        const data ={userId : localStorage.getItem('userId')}

       axios.post('http://localhost:3002/get-cart' , data)

       .then(res =>{
         console.log(res.data , '13')
         setData(res.data.data.cart)
       })
       .catch(err =>{
        console.log(err , '16')
       })

    },[])


    const handleOpenrazorpay = (paymentData) =>{

        const options = {
            key : "rzp_test_Cl0J6zcpr4UZmH" , 
            amount : Number(paymentData.amount) ,
            currency : "INR" ,
            order_id : paymentData.id , 
            name : 'Shopping website' , 
            handler : (response) =>{
                console.log(response , "35")

                axios.post('http://localhost:3002/verify' , {response : response})
                .then(res =>{
                    console.log(res , "39")
                })
                .catch(err =>{
                    console.log(err , "42")
                })
            }

        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }


    const handlePayment = (amount) =>{

        const _data = {amount : amount}

        axios.post('http://localhost:3002/orders' , _data)

        .then(res =>{
            console.log(res.data , "29")

            handleOpenrazorpay(res.data.data)
        })
        .catch(err =>{
            console.log(err , "32")
        })
    }

    return(
        <>
            User cart

            <button onClick={()=>{
                localStorage.clear()
                navigate('/login')}}>LogOut</button>

            <h1>Product List</h1>

            {data.map((item,index) =>{
                return <div>
                    <p>{item.Name} in {item.category}</p>
                    <p>by {item.seller}</p>
                    <p>PRICE: {item.price}</p>
                    <button onClick={() => handlePayment(item.price)}>PAY NOW</button>
                </div>
            })}
        </> 
    );
};

export default UserCart;