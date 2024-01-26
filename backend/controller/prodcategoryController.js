const category = require('../Models/prodcategoryModel'); 
const validateMongoDBId = require('./utils/validateMongoDBid');

module.exports.createCategory = async (req,res) =>{
    try{
        const newCategory = await category.create(req.body);
        return res.send({code : 200 , message : "category created" , data: newCategory});
    }
    catch{
        return res.send({code : 400 , message : "category not created" });
    }
};

// update
module.exports.updateCategory = async (req,res) =>{
    const {id }= req.params;
    validateMongoDBId(id);
    try{
        const updatedCategory = await category.findByIdAndUpdate(id , req.body ,{new:true});
        return res.send({code : 200 , message : "category updated" , data: updatedCategory});
    }
    catch{
        return res.send({code : 400 , message : "category not updated" });
    }
};

// delete
module.exports.deleteCategory = async (req,res) =>{
    const {id }= req.params;
    validateMongoDBId(id);
    try{
        const deletedCategory = await category.findByIdAnddelete(id);
        return res.send({code : 200 , message : "category deleted" , data: deletedCategory});
    }
    catch{
        return res.send({code : 400 , message : "category not deleted" });
    }
};

// get a category
module.exports.getACategory = async (req,res) =>{
    const {id }= req.params;
    validateMongoDBId(id);
    try{
        const getACategory = await category.findById(id);
        return res.send({code : 200 , message : "category fetched" , data: getACategory});
    }
    catch{
        return res.send({code : 400 , message : "category not fetched" });
    }
};

// get all
module.exports.getAllCategory = async (req,res) =>{
    try{
        const getAllCategory = await category.find();
        return res.send({code : 200 , message : "category fetched" , data: getAllCategory});
    }
    catch{
        return res.send({code : 400 , message : "category not fetched" });
    }
};