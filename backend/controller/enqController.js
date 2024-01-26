const enquiry = require('../Models/enqModel'); 
const validateMongoDBId = require('./utils/validateMongoDBid');

module.exports.createEnquiry = async (req,res) =>{
    try{
        const newEnquiry = await enquiry.create(req.body);
        return res.send({code : 200 , message : "enquiry created" , data: newEnquiry});
    }
    catch{
        return res.send({code : 400 , message : "enquiry not created" });
    }
};

// update
module.exports.updateEnquiry = async (req,res) =>{
    const {id }= req.params;
    validateMongoDBId(id);
    try{
        const updatedEnquiry = await enquiry.findByIdAndUpdate(id , req.body ,{new:true});
        return res.send({code : 200 , message : "enquiry updated" , data: updatedEnquiry});
    }
    catch{
        return res.send({code : 400 , message : "enquiry not updated" });
    }
};

// delete
module.exports.deleteEnquiry = async (req,res) =>{
    const {id }= req.params;
    validateMongoDBId(id);
    try{
        const deletedEnquiry = await enquiry.findByIdAnddelete(id);
        return res.send({code : 200 , message : "enquiry deleted" , data: deletedEnquiry});
    }
    catch{
        return res.send({code : 400 , message : "enquiry not deleted" });
    }
};

// get a enquiry
module.exports.getAEnquiry = async (req,res) =>{
    const {id }= req.params;
    validateMongoDBId(id);
    try{
        const getAEnquiry = await enquiry.findById(id);
        return res.send({code : 200 , message : "enquiry fetched" , data: getAEnquiry});
    }
    catch{
        return res.send({code : 400 , message : "enquiry not fetched" });
    }
};

// get all
module.exports.getAllEnquiry = async (req,res) =>{
    try{
        const getAllEnquiry = await enquiry.find();
        return res.send({code : 200 , message : "enquiry fetched" , data: getAllEnquiry});
    }
    catch{
        return res.send({code : 400 , message : "enquiry not fetched" });
    }
};