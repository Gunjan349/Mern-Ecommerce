import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { FaHeart } from "react-icons/fa";
import Search from "./Search";
import axios from "axios";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import API_URL from '../url'

const Products = forwardRef(({ color, size }, ref) => {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [spinner, setSpinner] = useState(false);

  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    const headers = { authorization: localStorage.getItem("token") };
    setSpinner(true);
    axios
      .get(API_URL + "/get-products", { headers })

      .then((res) => {
        setdata(res.data.data);
        setSpinner(false);
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

  const handleSearch = (e) => {
    
    setSearch(e);
    if (e === "") {
      setdata(data);
      setIsSearch(false);
      setRefresh(!refresh);
    } else {
      axios
        .get(API_URL + "/search?search=" + search)
        .then((res) => {
          setdata(res.data.data);
          setIsSearch(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useImperativeHandle(ref, () => ({
    handleColor() {
      const colourData = { color: color };

      axios
        .post(API_URL + "/color", colourData)
        .then((res) => {
          if (res.data.data.length > 0) {
            setdata(res.data.data);
            setIsSearch(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleSize() {
      const sizeData = { size: size };

      axios
        .post(API_URL + "/size", sizeData)
        .then((res) => {
          console.log(res.data);
          if (res.data.data.length > 0) {
            setdata(res.data.data);
            setIsSearch(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }));

  return (
    <div>
      
        <Search search={search} handleSearch={handleSearch} />
      
      <div className="wrapper bg-lightgrey mt-10 ">
        <div className="image-wrapper mx-16 sm:mx-0 ">
          <div className="product-boxes grid grid-cols-4 gap-x-5 gap-y-10 ">
            
            {data &&
              data.length > 0 &&
              data
                .filter((item) => {
                  if (isSearch === true) {
                    return item;
                  } else {
                    return item;
                  }
                })
                .map((item, index) => {
                  return (
                    <div className="relative overflow-hidden group h-80">
                      <img
                        src={API_URL + `/${item.image}`}
                        alt="img"
                        className="rounded-md h-full"
                      
                      />
                      <div className="content-body h-[100%] w-[100%] absolute top-0 -right-[100%] bg-[#1f3d4738] backdrop-blur-sm rounded-md text-lg p-3 leading-8 group-hover:right-0 duration-700 text-white xs:p-1"
                        onClick={() => handleProduct(item._id)}>
                        <div className="content-title text-xl font-bold mb-1 xs:hidden">
                          {item.Name}
                        </div>
                        <div className="content-desc xs:leading-6">{item.description}</div>
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
                              className={`absolute right-5 bottom-5 xs:right-2 xs:bottom-2 text-black`}
                              onClick={(e) => {
                                handleWishlist(item._id);
                              }}
                            />
                          )}
                        </div>
                     
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
      <div className="spinner fixed top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]">
        {spinner && <SyncLoader color={"#e36422"} loading={spinner} />}
      </div>
    </div>
  );
});

export default Products;
