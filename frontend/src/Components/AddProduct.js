import React, { useState , useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { TwitterPicker } from "react-color";
import Colors from "./Colors";
import categories from "./Categories";
import Sizes from "./Sizes";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";


const AddProduct = () => {


  const navigate = useNavigate();


  useEffect(() => {
     const token  = localStorage.getItem("token");
     const type = localStorage.getItem("userType");
     
     if(type === "user") {
      toast.error("You are not authorized to perform this action.")
      navigate("/")
     }
     if(!token){
       toast.error("You have to login first to perform this action.");
       navigate("/login");
     }
  } , [])


  const [image, setImage] = useState("");
  const [Name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  

  const onsubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("image", image);
    data.append("Name", Name);
    data.append("category", category);
    data.append("description", description);
    data.append("quantity", quantity);
    data.append("price", price);
    data.append("rating", rating);
    data.append("colors", JSON.stringify(colors));
    data.append("sizes", JSON.stringify(sizes));
    
    const headers = { authorization: localStorage.getItem("token") };
    
    axios
      .post("http://localhost:3002/add-products", data, { headers })
      .then((res) => {
        if (res.data.code === 200) {
          toast.success("Product added successfully.");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveColors = (color) => {
    const filtered = colors.filter((clr) => clr.color !== color.hex);
    setColors([...filtered, { color: color.hex, id: uuidv4() }]);
  };

  

  const chooseSize = (size) => {
    const filtered = sizes.filter(
      (selectedsize) => selectedsize.value !== size.value
    );
    setSizes([...filtered, size]);
  };

    
  return (
    <>
      <div className="flex items center gap-x-6 mt-10 ml-16">
          <Link to="/" className="p-2 bg-brown rounded-full w-fit text-white ">
            <MdKeyboardDoubleArrowLeft size={25} />
          </Link>
          <h1 className=" text-brown sm:text-xl text-3xl font-bold">
            Add Products
          </h1>
        </div>
      <form
        onSubmit={onsubmit}
        className="product-form bg-white flex flex-col gap-10 p-10 mx-52 mt-10"
      >
        <input
          type="file"
          placeholder="Image"
          className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />

        <input
          type="text"
          value={Name}
          className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value)
          }}
        />

        <input
          type="text"
          value={description}
          className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
          placeholder="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <input
          type="number"
          value={quantity}
          className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
          placeholder="Quantity"
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
        />

        <select
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          className="form-control bg-lightgrey border  border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
        >
          <option>All Categories</option>
          {categories &&
            categories.length > 0 &&
            categories.map((option) => {
              return <option value={option}>{option}</option>;
            })}
        </select>
        <h1>Choose colors:</h1>
        <div className="flex flex-wrap  gap-x-20">
          <TwitterPicker onChangeComplete={saveColors} />
          <Colors colors={colors} />
        </div>
        <h1>Choosee sizes</h1>
        {Sizes.length > 0 && (
          <div className="flex gap-x-4 ">
            {Sizes.map((size) => {
              return (
                <div
                  onClick={() => chooseSize(size)}
                  className="border-2 border-lightpurple px-3 py-2 rounded-lg"
                >
                  {size.value}
                </div>
              );
            })}
          </div>
        )}
        <input
          type="number"
          value={price}
          className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
          placeholder="Price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <input
          type="number"
          value={rating}
          className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500"
          placeholder="Rating"
          onChange={(e) => {
            setRating(e.target.value);
          }}
        />

        <button
          type="submit"
          className="bg-brown px-5 py-3 rounded-full text-white hover:bg-lightpurple w-fit"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AddProduct;
