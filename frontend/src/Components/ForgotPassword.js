import React ,{ useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify"

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [userEmail , setUserEmail] =useState('');
 

  const handleSubmit = (e) =>{
    e.preventDefault();
    const data = {email : userEmail}
    axios.post("http://localhost:3002/forgot-password" , data)
    .then((res) =>{
      if (res.data.code === 200) {
        toast.success("OTP has been sent to Email")
        navigate('/reset-password')
      }
      if(res.data.code === 500){
        toast.error(res.data.message)
      }
    })
    .catch((err) =>{
       console.log(err);
 
    })
  }

  return (
    <>
      <div className="text-center">
        <div className="login bg-white inline-block shadow-lg justify-center mt-20 rounded-lg  py-3">
          <div className="login-form w-full px-10 flex flex-col gap-y-6">
            <h1 className="font-medium tracking-wide text-xl text-center">Reset Your Password</h1>
            <p>Enter your email we will send a code <br /> to reset your password</p>
            <form action="" className="flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-7">
                <div>
                  <input
                    type="email"
                    className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
                    placeholder="Email"
                    name="email"
                    value={userEmail}
                    onChange={(e) => {setUserEmail(e.target.value);}}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-7 justify-center">
                <button className="text-white bg-brown rounded-lg hover:bg-lightpurple py-2 px-5" type="submit" onClick={handleSubmit}>
                  Send OTP
                </button>
               <Link to="/login" className=" bg-gray-200 rounded-lg hover:bg-lightgrey py-2 px-5">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
