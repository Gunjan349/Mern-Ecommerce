import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const FeaturedCollection = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const headers = { authorization: localStorage.getItem("token") };

    axios
      .get("http://localhost:3002/get-products", { headers })

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
      .post("http://localhost:3002/get-wishlist", _data)
      .then((res) => {
        setLikedProducts(res.data.data.wishlist);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const handleAddToCart = (productId) => {
    const ProductId = productId;
    const userId = localStorage.getItem("userId");

    const _data = { productId: ProductId, userId };
    axios
      .post("http://localhost:3002/user-cart", _data)

      .then((res) => {
        if (res.data.code === 200) {
          toast.success("Product added to cart.");
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
      .post("http://localhost:3002/wishlist", _data)

      .then((res) => {
        if (res.data.code == 200) {
          setRefresh(!refresh);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleProduct = (productId) => {
    navigate("/product/" + productId);
  };
  const deleteWishlist = (productId) => {
    const ProductId = productId;
    const userId = localStorage.getItem("userId");

    const _data = { productId: ProductId, userId };
    axios
      .post("http://localhost:3002/delete-wishlist", _data)

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
      <div className="wrapper mx-16 lg:mx-8 mt-20 sm:mx-3">
        <div className="heading font-bold text-2xl xs:text-xl mb-6 underline underline-offset-4">
          <h4>Featured Collection</h4>
        </div>

        <div className="image-wrapper">
          <div className="featured-collection grid grid-cols-2 gap-12 lg:gap-6">
            {data &&
              data.length > 0 &&
              data.map((item, index) => {
                if (item.rating === 5 && item.price > 4000) {
                  return (
                    <div className="relative flex bg-white h-96 rounded-md p-5 shadow-[0_35px_30px_-15px_rgba(0,0,0,0.3)] lg:p-5">
                      <img
                        src={`http://localhost:3002/${item.image}`}
                        alt="img"
                        className="rounded-md  lg:w-52"
                        onClick={() => handleProduct(item._id)}
                      />

                      <div className="content-body ml-6">
                        <div className="content-title text-xl font-bold mb-3 md:mb-0 leading-10 lg:leading-7 lg:text-xl">
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
                        <div className="leading-10">
                          <div className="price font-bold text-lg text-red-600 ">
                            Rs.{item.price}/-
                          </div>
                          <div>
                            <div className="absolute bottom-5 right-5">
                              {likedProducts.find(
                                (likedItems) => likedItems._id === item._id
                              ) ? (
                                <FaHeart
                                  size={30}
                                  className={`text-red-600`}
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

export default FeaturedCollection;
