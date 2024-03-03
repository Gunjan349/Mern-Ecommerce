import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../url";

const WomenWear = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);

  const [refresh, setRefresh] = useState(false);

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

  const handleProduct = (productId) => {
    navigate("/product/" + productId);
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
      <div className="wrapper bg-lightgrey mt-16">
        <div className="heading font-bold mx-16 lg:mx-8 text-2xl xs:text-xl mb-6 underline underline-offset-4">
          <h4>Women's Fashion</h4>
        </div>
        <div className="image-wrapper mx-16 sm:mx-0">
          <div className="fashion-boxes grid grid-cols-4 gap-5">
            {data &&
              data.length > 0 &&
              data.map((item, index) => {
                if (item.category === "Women" && item.rating === 5) {
                  return (
                    <div className="relative h-80 overflow-hidden group">
                      <img
                        src={API_URL + `/${item.image}`}
                        alt="img"
                        className="rounded-md h-full"
                      />
                      <div
                        className="content-body h-[100%] w-[100%] absolute top-0 -right-[100%]  bg-[#1f3d4738] backdrop-blur-sm rounded-md text-lg p-3 xs:p-2 leading-8 group-hover:right-0 duration-700 text-white"
                        onClick={() => handleProduct(item._id)}
                      >
                        <div className="content-title text-xl font-bold mb-1 xs:hidden">
                          {item.Name}
                        </div>
                        <div className="content-desc leading-6">
                          {item.description}
                        </div>
                        <ReactStars
                          count={5}
                          size={24}
                          value={item.rating}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <div className="price text-red-600 font-bold tracking-wide text-lg xs:font-normal">
                          Rs.{item.price}/-
                        </div>
                      </div>
                      <div>
                        {likedProducts.find(
                          (likedItems) => likedItems._id === item._id
                        ) ? (
                          <FaHeart
                            size={25}
                            className={`absolute right-5 bottom-5 xs:right-2 xs:bottom-2 text-red-600`}
                            onClick={(e) => {
                              deleteWishlist(item._id);
                            }}
                          />
                        ) : (
                          <FaHeart
                            size={25}
                            className={`absolute right-5 bottom-5 xs:right-2 xs:bottom-2`}
                            onClick={(e) => {
                              handleWishlist(item._id);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
        <div className="see-more mt-5 text-sky-800 text-xl">
          <Link to="/category/Women" className="hover:text-brown ">
            Explore Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default WomenWear;
