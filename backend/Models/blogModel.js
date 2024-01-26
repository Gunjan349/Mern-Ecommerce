const mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
   title : {
    type : String,
    required : true
   },
   description : {
    type : String,
    required : true
   },
   category : {
    type : String,
    required : true
   },
   numViews : {
    type : Number,
    default : 0
   },
   isLiked : {
    type : Boolean , 
    default : false
   },
   isDisLiked : {
    type : Boolean , 
    default : false
   },
   likes : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "users"
   },
   disLikes : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "users"
   },
   images : [],
   author : {
    type : String
   },
},
{
    toJSON : {
        virtuals : true
    },
    toObject :{
        virtuals : true
    },
    timestamps : true
});

module.exports = mongoose.model('blogs' , blogSchema)