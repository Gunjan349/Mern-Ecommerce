import React from "react";

const Checkout = () => {
  return (
    <>
      <div className="checkout grid grid-cols-2">
        <div className="checkout-left">
          <h1>Contact Information</h1>
          <p>Gunjan Garg (gunjangarg@gmail.com)</p>
          <h1>Shipping Address</h1>
          <form action="" className="flex">
            <div>
              <select className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500" ></select>
            </div>
            <div>
              <input type="text" placeholder="First Name" className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500" />
            </div>
            <div>
              <input type="text" placeholder="First Name" className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500" />
            </div>
            <div>
              <input type="text" placeholder="First Name" className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500" />
            </div>
            <div>
              <input type="text" placeholder="First Name" className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500" />
            </div>
            <div>
              <input type="text" placeholder="First Name" className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500" />
            </div>
            <div>
              <select className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500" ></select>
            </div>
            <div> <input type="text" placeholder="First Name" className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500" /></div>
          </form>
        </div>
        <div className="checkout-right"></div>
      </div>
    </>
  );
};

export default Checkout;
