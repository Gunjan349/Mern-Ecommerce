import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import API_URL from '../url'

const Login = () => {
  const navigate = useNavigate();
  const [userEmail , setUserEmail] =useState('');
  const [userPassword , setUserPassword] =useState('');

  const handleSubmit = (e) =>{
    e.preventDefault();
    const data = {email : userEmail , password : userPassword}
    axios.post(API_URL + "/login" , data)
    .then((res) =>{
      toast.success(res.data.message)
      if(res.data.token){
        navigate("/");
        localStorage.setItem("token" , res.data.token);
        localStorage.setItem("userId" , res.data.user._id);
        localStorage.setItem("user" , JSON.stringify(res.data.user));
        localStorage.setItem("userType" , res.data.user.type)
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
          <div className="login-form w-full px-10 flex flex-col gap-y-10">
            <h1 className="font-bold text-2xl text-center">Login</h1>
            <form action="" className="flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-7">
                <div>
                  <input
                    type="email"
                    className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
                    placeholder="Email"
                   
                    value={userEmail}
                    onChange={(e) =>{
                      setUserEmail(e.target.value)
                    }}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
                    placeholder="Password"
                    name="password"
                    value={userPassword}
                    onChange={(e) =>{
                      setUserPassword(e.target.value)
                    }}
                  />
                </div>
              </div>
              <div className="hover:text-blue-600">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              <div className="flex gap-x-7 justify-center">
                <button className="text-white bg-brown rounded-lg hover:bg-lightpurple py-2 px-3" onClick={handleSubmit}>
                  Login
                </button>
                <Link
                  to="/signup"
                  className="text-white bg-lightpurple rounded-lg hover:bg-brown py-2 px-3"
                >
                  Signup
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
