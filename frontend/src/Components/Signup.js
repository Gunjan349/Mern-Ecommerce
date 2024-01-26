import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Signup = () =>{
    return(
        <>
              <div className="text-center">
        <div className="login bg-white inline-block shadow-lg justify-center mt-20 rounded-lg  py-3">
          <div className="login-form w-full px-10 flex flex-col gap-y-10">
            <h1 className="font-medium tracking-wide text-lg text-center">New here? Create Account</h1>
            <form action="" className="flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-7">
              <div>
                  <input
                    type="text"
                    className="form-control bg-lightgrey border border-gray-400 p-1.5 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
                    placeholder="Your Name"
                    name="fname"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    className="form-control bg-lightgrey border border-gray-400 p-1.5 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
                    placeholder="Mobile"
                    name="mobile"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    className="form-control bg-lightgrey border border-gray-400 p-1.5 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
                    placeholder="Email"
                    name="email"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    className="form-control bg-lightgrey border border-gray-400 p-1.5 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
                    placeholder="Password"
                    name="password"
                  />
                </div>
              </div>
              <div className="flex gap-x-10 my-4 justify-center">
                <button className="text-white bg-pink rounded-full hover:bg-lightpurple py-2 px-5">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
        </>
    )
};

export default Signup;