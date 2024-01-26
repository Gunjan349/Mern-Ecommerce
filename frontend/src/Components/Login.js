import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
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
                    name="email"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
                    placeholder="Password"
                    name="password"
                  />
                </div>
              </div>
              <div className="hover:text-blue-600">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              <div className="flex gap-x-7 justify-center">
                <button className="text-white bg-pink rounded-lg hover:bg-lightpurple py-2 px-3">
                  Login
                </button>
                <Link
                  to="/signup"
                  className="text-white bg-lightpurple rounded-lg hover:bg-pink py-2 px-3"
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
