const mongoose = require("mongoose")

var ProductSchema = new mongoose.Schema({
    name: String,
    status: String,
    origin: String,
    quantity: Number,
    image: String,
    price: Number,
    material: String,
    bestseller: String,
})

var ProductModel = mongoose.model('product', ProductSchema, 'product')
module.exports = ProductModel