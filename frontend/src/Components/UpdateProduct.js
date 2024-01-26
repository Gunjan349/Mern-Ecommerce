import React, { useEffect , useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = ()=>{
    const params = useParams()
    const navigate = useNavigate()
    const [image , setImage] = useState("");
    const [Name , setName] = useState("");
    const [category , setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [seller , setSeller] = useState("");
    const [price , setPrice] = useState("");

    
    useEffect(()=>{ 
        const id = params.id
        axios.get(`http://localhost:3002/get-product/${id}`)
        .then(res =>{
            console.log(res.data.data)
            setImage(res.data.data.url)
            setName(res.data.data.Name)
            setCategory(res.data.data.category)
            setDescription(res.data.data.description)
            setSeller(res.data.data.seller)
            setPrice(res.data.data.price)
        })
        .catch(err =>{
            console.log(err)
        })
    },[])
    const onsubmit =(e) =>{
        e.preventDefault();
        console.log({id : params.id ,image , Name , category , description , seller , price : Number(price)})
        const data = {id : params.id ,image , Name , category , description , seller , price : Number(price)}
        axios.post('http://localhost:3002/update-products',data)
            .then(res =>{
            
            if(res.data.code === 200){
                navigate('/get/products')
            }
            })
            .catch(err =>{console.log(err)})
    }
    return(
        <>
            <form onSubmit={onsubmit}>
            Image :<input type="text" value={image} onChange={(e)=>{setImage(e.target.value)}}/>
            <br />
            Name :<input type="text" value={Name} onChange={(e)=>{setName(e.target.value)}}/>
            <br />
            Category :<input type="text" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
            <br />
            Description :<input type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
            <br />
            Seller :<input type="text" value={seller} onChange={(e)=>{setSeller(e.target.value)}}/>
            <br />
            Price :<input type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
            <button type="submit">Submit</button>
           </form>
        </>
    )
}


export default UpdateProduct