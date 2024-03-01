import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";

const SpecialProduct = () => {

  const navigate = useNavigate();
  const [data, setdata] = useState([]);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const headers = { authorization: localStorage.getItem("token") };

    axios
      .get("http://localhost:3002/get-products", { headers })

      .then((res) => {
        console.log(res, "19");
        setdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const handleProduct = (productId) => {
    navigate("/product/" + productId);
  }

  return (
    <>
      <div className="wrapper mx-16 lg:mx-8 mt-20 sm:mx-3">
      <div className="heading font-bold text-2xl xs:text-xl mb-6 underline underline-offset-4">
        Best Products
      </div>
      <div className="marquee-wrapper shadow-inner shadow-[#0000001a] rounded-md ">
        <div className="container rounded-md">
          <Marquee className="flex gap-x-5">
            {data &&
              data.length > 0 &&
              data.map((item, index) => {
                if (item.rating === 5 && item.category !== "Books" && item.price > 3000)
               { return (
                  <div className="max-w-xs" onClick={() => handleProduct(item._id)}>
                    <img src={`http://localhost:3002/${item.image}`} className="px-7 md:w-48"/>
                  </div>
                );}
              })}
          </Marquee>
        </div>
      </div>
      </div>
    </>
  );
};

export default SpecialProduct;
