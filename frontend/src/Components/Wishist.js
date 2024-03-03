import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { GoArrowLeft } from "react-icons/go";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import {toast} from "react-toastify";
import API_URL from '../url';

const Wishlist = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const data = { userId: localStorage.getItem("userId") };

    axios
      .post(API_URL + "/get-wishlist", data)

      .then((res) => {
       
        setData(res.data.data.wishlist);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please login first to see wishlisted products.")
      navigate("/")
    }
  }, []);

  const handleDelete = (productId) => {
    const ProductId = productId;

    const userId = localStorage.getItem("userId");
    const _data = { productId: ProductId, userId: userId };
    axios
      .post(API_URL + "/delete-wishlist", _data)
      .then((res) => {
        
        if (res.data.code == 200) {
          setRefresh(!refresh);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddToCart = (productId) => {
    const ProductId = productId;
    const userId = localStorage.getItem("userId");
 
    const _data = { productId: ProductId, userId };
    axios
      .post(API_URL + "/user-cart", _data)

      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          navigate("/cart");
          setRefresh(!refresh);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <div className="heading text-center mt-10 bg-purple text-white py-7 flex flex-col gap-y-3">
          <div className="flex justify-center">
            <CiHeart size={35} />
          </div>
          <h1 className="text-xl font-bold tracking-wider">Your Wishlist</h1>
          <div>
            <p>
              If you've added products to your wishist , you can find them below
            </p>
            <p>and purchase them right away.</p>
          </div>
        </div>

        <div className=" mt-12">
          <div className="image-wrapper ">
            <div className="wishlist-content boxes grid  mt-12 grid-cols-2 gap-12 lg:gap-6 ">
              {data.length === 0 && (
                <h1 className="mx-16 text-2xl font-bold text-purple sm:mx-6">
                  Hmm, can't find any product
                </h1>
              )}
              {data.map((item, index) => {
                return (
                  <div className=" mx-16 flex sm:mx-0 bg-white h-80 rounded-md p-8 shadow-[0_35px_30px_-15px_rgba(0,0,0,0.3)] lg:p-5">
                    <img
                      src={API_URL + `/${item.image}`}
                      alt="img"
                      className="rounded-md  lg:w-52 sm:w-44"
                    />

                    <div className="content-body relative ml-5">
                      <div className="content-title text-2xl font-bold mb-3 md:mb-0 leading-10 lg:leading-7 lg:text-xl md:text-lg">
                        {item.Name}
                      </div>
                      <div className="content-desc my-3 lg:my-1 xs:hidden">
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
                      <div className="stars xs:hidden"></div>
                      <div className="leading-10">
                        <div className="price text-lg text-red-600 sm:mt-0">
                          Rs.{item.price}/-
                        </div>

                        <div className="flex mt-6 gap-x-8 sm:mt-1 sm:flex-col">
                          <button
                            className="bg-brown text-white px-2  md:px-1 rounded-lg hover:underline sm:mt-2 "
                            onClick={() => {
                              handleDelete(item._id);
                            }}
                          >
                            Remove
                          </button>
                          <button
                            className="bg-brown text-white px-2  md:px-1 rounded-lg hover:underline sm:mt-2 "
                            onClick={() => {
                              handleAddToCart(item._id);
                            }}
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link to="/" className="flex gap-x-1 sm:mx-6 mx-16 mt-10 items-center">
              <GoArrowLeft size={25} className="text-brown"/>
              <h1 className="text-brown text-xl font-bold">Continue Shopping</h1>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
