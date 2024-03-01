const mongoose = require('mongoose')
const {Schema} = mongoose;

const productSchema = new Schema({
    image : String,
    Name : String,
    description : String,
    price : Number,
    quantity : Number,
    category : String,
    colors : {type : []},
    sizes : {type : []},
    rating : Number,
} , {timestamps : true})

module.exports = mongoose.model('products',productSchema);