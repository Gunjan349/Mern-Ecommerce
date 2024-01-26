const color = require('../Models/colorModel'); 
const validateMongoDBId = require('./utils/validateMongoDBid');

module.exports.createcolor = async (req,res) =>{
    try{
        const newcolor = await color.create(req.body);
        return res.send({code : 200 , message : "color created" , data: newcolor});
    }
    catch{
        return res.send({code : 400 , message : "color not created" });
    }
};

// update
module.exports.updatecolor = async (req,res) =>{
    const {id }= req.params;
    validateMongoDBId(id);
    try{
        const updatedcolor = await color.findByIdAndUpdate(id , req.body ,{new:true});
        return res.send({code : 200 , message : "color updated" , data: updatedcolor});
    }
    catch{
        return res.send({code : 400 , message : "color not updated" });
    }
};

// delete
module.exports.deletecolor = async (req,res) =>{
    const {id }= req.params;
    validateMongoDBId(id);
    try{
        const deletedcolor = await color.findByIdAnddelete(id);
        return res.send({code : 200 , message : "color deleted" , data: deletedcolor});
    }
    catch{
        return res.send({code : 400 , message : "color not deleted" });
    }
};

// get a color
module.exports.getAcolor = async (req,res) =>{
    const {id }= req.params;
    validateMongoDBId(id);
    try{
        const getAcolor = await color.findById(id);
        return res.send({code : 200 , message : "color fetched" , data: getAcolor});
    }
    catch{
        return res.send({code : 400 , message : "color not fetched" });
    }
};

// get all
module.exports.getAllcolor = async (req,res) =>{
    try{
        const getAllcolor = await color.find();
        return res.send({code : 200 , message : "color fetched" , data: getAllcolor});
    }
    catch{
        return res.send({code : 400 , message : "color not fetched" });
    }
};