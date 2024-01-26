import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const GetProduct = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const rights = JSON.parse(localStorage.getItem('rights'))[0]?.permissions
 
  const [refresh , setRefresh] = useState(false)
  
  useEffect(() => {

    const headers = { authorization : localStorage.getItem('token') }
    
    axios.get("http://localhost:3002/get-products",{headers})
    
      .then((res) => {
        console.log(res,"19")
        setdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);


  const deleteProducts = ()=>{
    const data = deleteData
    axios.post("http://localhost:3002/delete-products" , data)
    .then(res=>{
      console.log(res.data)
      if(res.data.code == 200){
        setRefresh(!refresh)
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const handleAddToCart =(productId) =>{
    const ProductId = productId
    const userId = localStorage.getItem('userId')
   
    const _data = {productId : ProductId, userId}
    axios.post('http://localhost:3002/add-to-cart',_data)

    .then(res=>{
      console.log(res.data , '44')
      if(res.data.code == 200){
        setRefresh(!refresh)
      }
    })
    .catch(err=>{
      console.log(err , '50')
    })
  }
 

  return (
    <>
      main Products page:
      <Link to='/user/cart'>Go To Cart</Link>
      {deleteData.length >0 &&
      <button onClick={deleteProducts}>Delete product</button>}
      {data &&
        data.length > 0 &&
        data.map((item, index) => {
          return (
            <div>
              {item._id}
              <br />
              {rights.indexOf('Update price') !== -1 &&<button
                onClick={() => {
                  console.log(item._id);
                  navigate(`/get/product/${item._id}`);
                }}
              >Update</button>}
              <br />
             {rights.indexOf('delete products') !== -1 && <input
                onChange={(e) => {
                  if (e.target.checked === true) {
                    setDeleteData([...deleteData, item._id]);
                  } else {
                    setDeleteData(deleteData.filter((d) => d !== item._id));
                  }
                }}
                type="checkbox"/>}
                <br />
                <button onClick={()=>{
                    handleAddToCart(item._id)
                }}>add to cart</button>
            </div>
          );
        })}
    </>
  );
};

export default GetProduct;
