import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { FaHeart } from "react-icons/fa";
import Search from "./Search";
import axios from "axios";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";

const CategoryPage = forwardRef(({ color, size }, ref) => {

  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const param = useParams();
  useEffect(() => {
    const headers = { authorization: localStorage.getItem("token") };

    axios
      .get("http://localhost:3002/category?catName=" + param.catName, {
        headers,
      })

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

  const handleSearch = (e) => {
    setSearch(e);
    if (e === "") {
      setdata(data);
      setIsSearch(false);
      setRefresh(!refresh);
    } else {
      axios
        .get("http://localhost:3002/search?search=" + search)
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
      const colourData = { color: color , category : param.catName };

      axios
        .post("http://localhost:3002/category-color", colourData)
        .then((res) => {
         
          if (res.data.data.length > 0 && res.data.code === 200) {
            setdata(res.data.data);
            setIsSearch(true);
          }
          
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleSize() {
      const sizeData = { size: size , category : param.catName};

      axios
        .post("http://localhost:3002/category-size", sizeData)
        .then((res) => {
          console.log(res.data);
          if (res.data.data.length > 0) {
            setdata(res.data.data);
            setIsSearch(true);
          }
          else{
            setdata("")
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }));


  return (
    <div className="mx-16 lg:mx-8">
      <div className="flex items center gap-x-10">
        <Link to="/" className="p-3 bg-brown rounded-full w-fit text-white ">
          <MdKeyboardDoubleArrowLeft size={25} />
        </Link>
        <Search search={search} handleSearch={handleSearch} />
      </div>
      <div className="wrapper bg-lightgrey mt-10 ">
        <div className=" image-wrapper">
          <div className="product-boxes grid grid-cols-4 gap-5 gap-y-16">
            {data && data.length > 0 && data
              .filter((item) => {
                if (isSearch === true) {
                  return item;
                } else {
                  return item;
                }
              })
              .map((item, index) => {
                return (
                  <div className="relative overflow-hidden group">
                    <img
                      src={`http://localhost:3002/${item.image}`}
                      alt="img"
                      className="rounded-md"
                     
                    />
                    <div className="content-body h-[100%] w-[100%] absolute top-0 -right-[100%] bg-[#1f3d4738] backdrop-blur-sm rounded-md text-lg p-3 leading-8 group-hover:right-0 duration-700 text-white"  onClick={() => handleProduct(item._id)}>
                    
                      <div className="content-title text-xl font-bold mb-2 ">
                        {item.Name}
                      </div>
                      <div className="content-desc">{item.description}</div>
                      <ReactStars
                        count={5}
                        size={24}
                        value={item.rating}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <div className="price text-red-600 font-bold tracking-wide text-lg">Rs.{item.price}/-</div>
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
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default CategoryPage;
