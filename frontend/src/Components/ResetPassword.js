import React from "react";

const ResetPassword = () => {
  return (
    <>
      <div className="text-center">
        <div className="login bg-white inline-block shadow-lg justify-center mt-20 rounded-lg  py-3">
          <div className="login-form w-full px-10 flex flex-col gap-y-10">
            <h1 className=" text-lg text-center">Create New Password</h1>
            <form action="" className="flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-7">
                <div>
                  <input
                    type="password"
                    className="form-control bg-lightgrey border border-gray-400 p-1.5 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
                    placeholder='Password'
                    name="password"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    className="form-control bg-lightgrey border border-gray-400 p-1.5 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
                    placeholder="Confirm Password"
                    name="confirmpassword"
                  />
                </div>
              </div>
              <div className="flex gap-x-7 justify-center my-4">
                <button className="text-white bg-pink rounded-full hover:bg-lightpurple py-2 px-5">
                  Change
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
