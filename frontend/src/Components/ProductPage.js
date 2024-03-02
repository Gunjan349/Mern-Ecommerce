import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import API_URL from '../url'
import {toast} from "react-toastify";

const ProductPage = () => {
  const [data, setdata] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);

 
  const copyToClipboard = (text) => {
    
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const param = useParams();
 

  useEffect(() => {
    const headers = { authorization: localStorage.getItem("token") };

    axios
      .get(API_URL + "/get-product/" + param.id, { headers })

      .then((res) => {
       
        setdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  useEffect(() => {
    const _data = { userId: localStorage.getItem("userId") };
    axios
      .post(API_URL + "/get-wishlist", _data)
      .then((res) => {
        setLikedProducts(res.data.data.wishlist);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  console.log(process.env)

  const handleAddToCart = (productId) => {
    const ProductId = productId;
    const userId = localStorage.getItem("userId");
   
    const _data = { productId: ProductId, userId };
    axios
      .post(API_URL + "/user-cart", _data)

      .then((res) => {
       
        if (res.data.code === 200) {
          toast.success("Product added to cart")
          setRefresh(!refresh);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleWishlist = (productId) => {
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
  };

  const deleteWishlist = (productId) => {
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
  };
  

  return (
    <>
      <div className="main-product mx-44 mt-10">
        <div className="mb-24  bg-white p-6 rounded-md grid grid-cols-2 md:grid-cols-1">
          <div className="product-left border-r-2 border-gray-200 md:border-none ">
            <div className="main-image h-full">
              <img
                src={API_URL + `/${data.image}`}
                alt="image"
                className="rounded-md h-full"
              ></img>
            </div>
          </div>
          <div className=" ml-12 flex flex-col gap-y-3 lg:ml-4">
            <div className="heading font-bold text-3xl tracking-wide">
              {data.Name}
            </div>
            <div className="description text-lg text-gray-500">
              {data.description}
            </div>
            <div className="price font-bold text-lg text-red-600">
              Rs.{data.price}/-
            </div>
            <div className="stars flex gap-x-4 items-center">
              {data && data.rating && (
                <ReactStars
                  count={5}
                  size={28}
                  value={data.rating}
                  edit={false}
                  activeColor="#ffd700"
                />
              )}
              <p className="text-lg text-gray-500">(Based on 50% reviews)</p>
            </div>
           

            <div className="flex gap-x-2">
              <h1 className="font-bold text-lg">Avaibility :</h1>
              <h2 className="text-lg">{data.quantity} left</h2>
            </div>

            <div>
              <h1 className="font-bold text-lg mb-3">Size :</h1>
              <ul className="flex gap-x-4">
                {data &&
                  data.sizes &&
                  data.sizes.map((size) => {
                    return (
                      <li className="border-2 border-gray-200 py-1 px-3 rounded-md text-lg">
                        {size.value}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="colour mt-3">
              <h2 className="font-bold mb-3 text-lg">Colour :</h2>
              <ul className="flex gap-x-4">
                {data &&
                  data.colors &&
                  data.colors.map((item) => {
                    return (
                      <li
                        className="p-3"
                        style={{ background: item.color }}
                      ></li>
                    );
                  })}
              </ul>
            </div>

            <div className="flex gap-x-8 items-center mt-3">
              <button
                className="text-white bg-brown rounded-full hover:bg-lightpurple py-2 px-5"
                onClick={() => {
                  handleAddToCart(data._id);
                }}
              >
                Add To Cart
              </button>
              <Link
                to="/cart"
                className="text-white bg-lightpurple rounded-full hover:bg-brown py-2 px-5"
              >
                Buy Now
              </Link>
              <div>
                {likedProducts.find(
                  (likedItems) => likedItems._id === data._id
                ) ? (
                  <FaHeart
                    size={30}
                    className={` text-red-600`}
                    onClick={(e) => {
                      deleteWishlist(data._id);
                    }}
                  />
                ) : (
                  <FaHeart
                    size={30}
                    
                    onClick={(e) => {
                      handleWishlist(data._id);
                    }}
                  />
                )}
              </div>
            </div>
            <div className="share flex mt-3 gap-x-3">
              <h3 className="font-bold text-lg-">Share :</h3>
              <a
                href="javascrip:void(0);"
                onClick={() => {
                  copyToClipboard("link");
                }}
              >
                Copy Link
              </a>
            </div>
          </div>
        </div>
        <div className="description bg-white shadow-lg p-7 gap-y-3 rounded-md mb-16">
          <h1 className="font-bold text-xl tracking-wide mb-3">Description</h1>
          <p>{data.description}</p>
        </div>   
      </div>
    </>
  );
};

export default ProductPage;
