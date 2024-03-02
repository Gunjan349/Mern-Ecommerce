import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import API_URL from '../url'

const Signup = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userType , setUserType] = useState("user");
  
 
  const handlesignup = (e) =>{
    e.preventDefault();
    toast.info("Signing up as Admin")
    setUserType("seller");
   
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: userEmail,
      phone: userMobile,
      password: userPassword,
      Name: userName,
      type: userType,
    };
    axios
      .post(API_URL + '/signup', data)
      .then((res) => {
        if (res.data.code===200) {
          toast.success("Signed up successfully")
          navigate("/login");
        }
        else{
          toast.error(res.data.message)
          if(res.data.message === "User already exists"){
            navigate("/login")
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="text-center">
        <div className="login bg-white inline-block shadow-lg justify-center mt-20 rounded-lg  py-3">
          <div className="login-form w-full px-10 flex flex-col gap-y-10">
            <h1 className="font-medium tracking-wide text-lg text-center">
              New here? Create Account
            </h1>
            <form className="flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-7">
                <div>
                  <input
                    type="text"
                    className="form-control bg-lightgrey border border-gray-400 p-1.5 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
                    placeholder="Your Name"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    className="form-control bg-lightgrey border border-gray-400 p-1.5 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
                    placeholder="Mobile"
                    value={userMobile}
                    onChange={(e) => {
                      setUserMobile(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    className="form-control bg-lightgrey border border-gray-400 p-1.5 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
                    placeholder="Email"
                    value={userEmail}
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    className="form-control bg-lightgrey border border-gray-400 p-1.5 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
                    placeholder="Password"
                    value={userPassword}
                    onChange={(e) => {
                      setUserPassword(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <button onClick={handlesignup} className="text-xl">Signup as ADMIN</button>
                </div>
              </div>
              <div className="flex gap-x-10 my-4 justify-center">
                <button
                  className="text-white bg-brown rounded-full hover:bg-lightpurple py-2 px-5"
                  onClick={handleSubmit}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
