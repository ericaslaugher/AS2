const mongoose = require("mongoose")

var ProductSchema = new mongoose.Schema({
    name: String,
    status: String,
    origin: String,
    image: String,
    price: Number,
    material: String,
    bestseller: Boolean
    
    

})

var ProductModel = mongoose.model('product', ProductSchema, 'product')
module.exports = ProductModel