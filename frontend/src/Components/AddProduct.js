import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


    const AddProduct = () =>{
    const navigate = useNavigate()
    const [image , setImage] = useState("");
    const [Name , setName] = useState("");
    const [brand , setbrand] = useState("");
    const [category , setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [seller , setSeller] = useState("");
    const [price , setPrice] = useState("");
    const [sold , setsold] = useState("");
    const [colour , setcolour] = useState("");
    const [ratings , setratings] = useState("");
    const [quantity , setquantity] = useState("");

    const onsubmit =(e) =>{
        e.preventDefault();
        console.log({image , Name , brand , category , description , seller , price, sold , colour , ratings , quantity})
        const data = {url:image , Name , brand , category , description , seller , price , sold , colour , ratings , quantity}
        console.log(data , "19")
        const headers = { authorization : localStorage.getItem('token') }
        console.log(headers)
        axios.post("http://localhost:3002/add-products" , data ,{headers})
        .then(res =>{
            console.log(res , "22")
            if(res.data=='saved'){
                navigate('/get/products')}
        })
        .catch(err =>{
            console.log(err)
        })
    }

    return(
        <>
           <form onSubmit={onsubmit}>
            Image :<input type="text" value={image} onChange={(e)=>{setImage(e.target.value)}}/>
            <br />
            Name :<input type="text" value={Name} onChange={(e)=>{setName(e.target.value)}}/>
            <br />
            brand :<input type="text" value={brand} onChange={(e)=>{setbrand(e.target.value)}}/>
            <br />
            Category :<input type="text" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
            <br />
            Description :<input type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
            <br />
            Seller :<input type="text" value={seller} onChange={(e)=>{setSeller(e.target.value)}}/>
            <br />
            Price :<input type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
            <br />
            sold :<input type="text" value={sold} onChange={(e)=>{setsold(e.target.value)}}/>
            <br />
            colour :<input type="text" value={colour} onChange={(e)=>{setcolour(e.target.value)}}/>
            <br />
            ratings :<input type="number" value={ratings} onChange={(e)=>{setratings(e.target.value)}}/>
            <br />
            quantity :<input type="number" value={quantity} onChange={(e)=>{setquantity(e.target.value)}}/>
            <button type="submit">Submit</button>
           </form>
        </>
    )
}

export default AddProduct