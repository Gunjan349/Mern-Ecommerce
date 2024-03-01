import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Mobiles = () => {
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

  const handleProduct = (productId) => {
    navigate("/product/" + productId);
  };

  const handleWishlist = (productId) => {
    const ProductId = productId;
    const userId = localStorage.getItem("userId");

    const _data = { productId: ProductId, userId };
    axios
      .post("http://localhost:3002/wishlist", _data)

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
      <div className="wrapper bg-lightgrey mx-16 lg:mx-8 mt-20">
        <div className="heading font-bold text-2xl xs:text-xl mb-6 underline underline-offset-4">
          <h4>Mobiles & Devices</h4>
        </div>
        <div className="image-wrapper">
          <div className="fashion-boxes grid grid-cols-4 gap-5 ">
            {data &&
              data.length > 0 &&
              data.map((item, index) => {
                if (item.category === "Devices" && item.rating === 5) {
                  return (
                    <div className=" relative overflow-hidden group">
                      <img
                        src={`http://localhost:3002/${item.image}`}
                        alt="img"
                        className="rounded-md"
                      />
                      <div
                        className="content-body h-[100%] w-[100%] absolute top-0 -right-[100%]  bg-[#1f3d4738] backdrop-blur-sm rounded-md text-lg p-3 leading-8 group-hover:right-0 duration-700 text-white"
                        onClick={() => handleProduct(item._id)}
                      >
                        <div className="content-title text-xl font-bold mb-1">
                          {item.Name}
                        </div>
                        <div className="content-desc lg:hidden">{item.description}</div>
                        <ReactStars
                          count={5}
                          size={24}
                          value={item.rating}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <div className="price  text-red-600 font-bold tracking-wide text-lg">Rs.{item.price}/-</div>
                      </div>
                      <div>
                        {likedProducts.find(
                          (likedItems) => likedItems._id === item._id
                        ) ? (
                          <FaHeart
                            size={30}
                            className={`absolute right-5 bottom-5 text-red-600`}
                            onClick={(e) => {
                              deleteWishlist(item._id);
                            }}
                          />
                        ) : (
                          <FaHeart
                            size={30}
                            className={`absolute right-5 bottom-5 text-black`}
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
          <Link to="/category/Devices" className="hover:text-brown ">
            Explore Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default Mobiles;
