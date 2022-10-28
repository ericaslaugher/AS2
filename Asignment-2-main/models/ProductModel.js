const mongoose = require("mongoose")

var ProductSchema = new mongoose.Schema({
    name: String,
    status: String,
    origin: String,
    image: String,
    price: String,
    material: String

})

var ProductModel = mongoose.model('product', ProductSchema, 'product')
module.exports = ProductModel