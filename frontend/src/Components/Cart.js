import React, { useState, useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import API_URL from '../url'

const Cart = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const data = { userId: localStorage.getItem("userId") };

    axios
      .post(API_URL + "/get-cart", data)

      .then((res) => {
        setData(res.data.data.cart);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please login first , to see cart products");
      navigate("/")
    }
  }, []);

  const handleOpenrazorpay = (paymentData) => {
    const options = {
      key: "rzp_test_Cl0J6zcpr4UZmH",
      amount: Number(paymentData.amount),
      currency: "INR",
      order_id: paymentData.id,
      name: "Shopping website",
      handler: (response) => {
        axios
          .post(API_URL + "/verify", { response: response })
          .then((res) => {})
          .catch((err) => {
            console.log(err);
          });
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePayment = (amount) => {
    const _data = { amount: amount };

    axios
      .post(API_URL + "/orders", _data)

      .then((res) => {
        handleOpenrazorpay(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (productId) => {
    const ProductId = productId;

    const userId = localStorage.getItem("userId");
    const _data = { productId: ProductId, userId: userId };
    axios
      .post(API_URL + "/delete-cart", _data)
      .then((res) => {
        if (res.data.code == 200) {
          setRefresh(!refresh);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="mx-16">
        <div className="flex items center gap-x-6 mt-10">
          <Link to="/" className="p-2 bg-brown rounded-full w-fit text-white ">
            <MdKeyboardDoubleArrowLeft size={25} />
          </Link>
          <h1 className=" text-brown sm:text-xl text-3xl font-bold">
            Shopping Cart
          </h1>
        </div>

        <div className="image-wrapper ">
          <div className="cart-content boxes grid  mt-12 grid-cols-2 gap-12 lg:gap-6">
            {data.length === 0 && (
              <h1 className=" text-2xl font-bold text-purple">
                Hmm, can't find any product
              </h1>
            )}
            {data.map((item, index) => {
              return (
                <div className="box1 flex bg-white h-80 rounded-md p-8 shadow-[0_35px_30px_-15px_rgba(0,0,0,0.3)] lg:p-5">
                  <img
                    src={API_URL + `/${item.image}`}
                    alt="img"
                    className="rounded-md  lg:w-52 sm:w-44"
                  />

                  <div className="content-body relative ml-5">
                    <div className="content-title text-2xl font-bold mb-3 md:mb-0 leading-10 lg:leading-7 lg:text-xl md:text-lg">
                      {item.Name}
                    </div>
                    <div className="content-desc1 my-3  xs:hidden">
                      {item.description}
                    </div>
                    <div className="stars">
                      <ReactStars
                        count={5}
                        size={28}
                        value={item.rating}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                    <div className="leading-10">
                      <div className="price text-lg text-red-600 font-bold tracking-wide sm:mt-0">
                        Rs.{item.price}/-
                      </div>
                      <div className="flex items-center   mt-3 lg:mt-0">
                        <button
                          className="bg-brown text-white px-2  md:px-1 rounded-lg hover:underline mt-4"
                          onClick={() => {
                            handleDelete(item._id);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {data.length !== 0 && (
              <div className="bg-lightpurple rounded-md text-white p-8 relative">
                <h1 className="text-2xl underline underline-offset-4 font-bold">
                  Your Total
                </h1>
                <p className="text-red-500 text-xl font-bold mt-3">
                  Rs.
                  {data
                    .map((item) => item.price)
                    .reduce((acc, item) => acc + item, 0)}
                  /-
                </p>
                <button
                  className="bg-brown rounded-lg px-5 absolute bottom-5 right-5 text-lg py-2"
                  onClick={() => {
                    handlePayment(
                      data
                        .map((item) => item.price)
                        .reduce((acc, item) => acc + item, 0)
                    );
                  }}
                >
                  Proceed to Pay
                </button>
              </div>
            )}
          </div>
          <Link to="/" className="flex gap-x-3 mt-10 items-center">
            <GoArrowLeft size={25} className="text-brown" />
            <h1 className="text-brown text-xl font-bold">Continue Shopping</h1>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;
