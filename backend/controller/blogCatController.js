const blogcategory = require('../Models/blogCategoryModel');
const validateMongoDBId = require('./utils/validateMongoDBid');

module.exports.createCategory = async (req,res) =>{
    try{
        const newCategory = await blogcategory.create(req.body);
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
        const updatedCategory = await blogcategory.findByIdAndUpdate(id , req.body ,{new:true});
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
        const deletedCategory = await blogcategory.findByIdAnddelete(id);
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
        const getACategory = await blogcategory.findById(id);
        return res.send({code : 200 , message : "category fetched" , data: getACategory});
    }
    catch{
        return res.send({code : 400 , message : "category not fetched" });
    }
};

// get all
module.exports.getAllCategory = async (req,res) =>{
    try{
        const getAllCategory = await blogcategory.find();
        return res.send({code : 200 , message : "category fetched" , data: getAllCategory});
    }
    catch{
        return res.send({code : 400 , message : "category not fetched" });
    }
};