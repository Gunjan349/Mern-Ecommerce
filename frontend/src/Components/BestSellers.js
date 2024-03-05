import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import {toast} from 'react-toastify'
import API_URL from '../url'

const BestSellers = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const token  = localStorage.getItem('token')

  useEffect(() => {
    const headers = { authorization: localStorage.getItem("token") };

    axios
      .get(API_URL + "/get-products", { headers })

      .then((res) => {
       
        setdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  useEffect(() => {
   if(token){
    const _data = { userId: localStorage.getItem("userId") };
    axios
      .post(API_URL + "/get-wishlist", _data)
      .then((res) => {
        setLikedProducts(res.data.data.wishlist);
      })
      .catch((err) => {
        console.log(err);
      });
   }
  }, [refresh]);

  const handleAddToCart = (productId) => {
    const ProductId = productId;
    const userId = localStorage.getItem("userId");
   
    const _data = { productId: ProductId, userId };
    axios
      .post(API_URL + "/user-cart", _data)

      .then((res) => {
       
        if (res.data.code == 200) {
          toast.success("Product added to cart");
          setRefresh(!refresh);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleWishlist = (productId) => {
    if(token){
      const ProductId = productId;
    const userId = localStorage.getItem("userId");
  
    const _data = { productId: ProductId, userId };
    axios
      .post(API_URL + "/wishlist", _data)

      .then((res) => {
        
        if (res.data.code === 200) {
          setRefresh(!refresh);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else{
      toast.error("Please login first")
    }
  };

  const handleProduct = (productId) => {
    navigate("/product/" + productId);
  };
  const deleteWishlist = (productId) => {
    if(token)
    {
      const ProductId = productId;
    const userId = localStorage.getItem("userId");

    const _data = { productId: ProductId, userId };
    axios
      .post(API_URL + "/delete-wishlist", _data)

      .then((res) => {
        if (res.data.code === 200) {
          setRefresh(!refresh);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else{
      toast.error("Please login first")
    }
  };

  return (
    <>
      <div className="wrapper  mt-16">
        <div className="heading mx-16 lg:mx-8 z-10 relative font-bold text-2xl xs:text-xl mb-6 underline underline-offset-4">
          <h4>Best Deals Today</h4>
        </div>

        <div className="image-wrapper mx-16 sm:mx-0">
          <div className="bestsellers grid grid-cols-2 gap-12 lg:gap-6">
            {data &&
              data.length > 0 &&
              data.map((item, index) => {
                if (item.price < 100 && item.rating === 5) {
                  return (
                    <div className="relative flex bg-white rounded-md p-8 shadow-[0_35px_30px_-15px_rgba(0,0,0,0.3)] lg:p-5 xs:pl-0">
                      <img
                        src={API_URL + `/${item.image}`}
                        alt="img"
                        className="rounded-md  lg:w-56 h-80"
                        onClick={() => handleProduct(item._id)}
                      />

                      <div className="content-body  ml-6">
                        <div className="content-title text-2xl font-bold mb-3 leading-10 lg:leading-7 lg:text-xl">
                          {item.Name}
                        </div>
                        <div className="content-desc my-3  xs:hidden">
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
                          <div className="price font-bold text-lg text-red-600 ">
                            Rs.{item.price}/-
                          </div>
                          <div className="">
                            <div className="absolute bottom-5 right-5">
                              {likedProducts.find(
                                (likedItems) => likedItems._id === item._id
                              ) ? (
                                <FaHeart
                                  size={30}
                                  className={` text-red-600`}
                                  onClick={(e) => {
                                    deleteWishlist(item._id);
                                  }}
                                />
                              ) : (
                                <FaHeart
                                  size={30}
                                
                                  onClick={(e) => {
                                    handleWishlist(item._id);
                                  }}
                                />
                              )}
                            </div>

                            <button
                              className="bg-brown text-white px-2 rounded-lg hover:underline mt-3 "
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
                }
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BestSellers;
