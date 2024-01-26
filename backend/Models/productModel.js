const mongoose = require('mongoose')
const {Schema} = mongoose;

const productSchema = new Schema({
    url : String,
    Name : String,
    brand : String,
    category : String,
    description : String,
    seller : String,
    price : Number,
    quantity : Number,
    images : [],
    sold :{
        type : Number ,
        default : 0
    },
    color : [],
    tags : [],
    ratings :[{
       star : Number ,
       comment : String ,
       postedby : {type : mongoose.Schema.Types.ObjectId , ref : 'users'}
    }],
    totalrating : {
        type : String ,
        comment : String ,
        default : 0
    }
} , {timestamps : true})

module.exports = mongoose.model('products',productSchema);