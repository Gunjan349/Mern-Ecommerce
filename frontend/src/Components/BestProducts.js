import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from '../url'

const SpecialProduct = () => {

  const navigate = useNavigate();
  const [data, setdata] = useState([]);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const headers = { authorization: localStorage.getItem("token") };

    axios
      .get(API_URL + "/get-products", { headers })

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
      <div className="wrapper  mt-20 sm:mx-3">
      <div className="heading mx-16 lg:mx-8 font-bold text-2xl xs:text-xl mb-6 underline underline-offset-4">
        Best Products
      </div>
      <div className="marquee-wrapper shadow-inner shadow-[#0000001a] rounded-md ">
        <div className="container mx-0">
          <Marquee className="flex gap-x-5">
            {data &&
              data.length > 0 &&
              data.map((item, index) => {
                if (item.rating === 5 && item.category !== "Books" && item.price > 3000)
               { return (
                  <div className="max-w-xs" onClick={() => handleProduct(item._id)}>
                    <img src={API_URL + `/${item.image}`} className="px-7 md:w-48"/>
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
