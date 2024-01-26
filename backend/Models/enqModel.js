const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    } ,
    mobile : {
        type : String,
        required : true
    },
    comment : {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : "submitted" ,
        enum : ["submitted" , "contacted" , "In progress"]
    }
});

module.exports = mongoose.model('enquiry', enquirySchema);