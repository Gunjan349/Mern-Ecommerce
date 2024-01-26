const brand = require('../Models/brandModel'); 
const validateMongoDBId = require('./utils/validateMongoDBid');

module.exports.createbrand = async (req,res) =>{
    try{
        const newbrand = await brand.create(req.body);
        return res.send({code : 200 , message : "brand created" , data: newbrand});
    }
    catch{
        return res.send({code : 400 , message : "brand not created" });
    }
};

// update
module.exports.updatebrand = async (req,res) =>{
    const {id }= req.params;
    validateMongoDBId(id);
    try{
        const updatedbrand = await brand.findByIdAndUpdate(id , req.body ,{new:true});
        return res.send({code : 200 , message : "brand updated" , data: updatedbrand});
    }
    catch{
        return res.send({code : 400 , message : "brand not updated" });
    }
};

// delete
module.exports.deletebrand = async (req,res) =>{
    const {id }= req.params;
    validateMongoDBId(id);
    try{
        const deletedbrand = await brand.findByIdAnddelete(id);
        return res.send({code : 200 , message : "brand deleted" , data: deletedbrand});
    }
    catch{
        return res.send({code : 400 , message : "brand not deleted" });
    }
};

// get a brand
module.exports.getAbrand = async (req,res) =>{
    const {id }= req.params;
    validateMongoDBId(id);
    try{
        const getAbrand = await brand.findById(id);
        return res.send({code : 200 , message : "brand fetched" , data: getAbrand});
    }
    catch{
        return res.send({code : 400 , message : "brand not fetched" });
    }
};

// get all
module.exports.getAllbrand = async (req,res) =>{
    try{
        const getAllbrand = await brand.find();
        return res.send({code : 200 , message : "brand fetched" , data: getAllbrand});
    }
    catch{
        return res.send({code : 400 , message : "brand not fetched" });
    }
};