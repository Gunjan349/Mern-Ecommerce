const mongoose = require('mongoose')
const validateMongoDBId = (id =>{
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid){
        return res.send({code : 404 , message : "mongodb id not found"})
    }
});

module.exports = validateMongoDBId;