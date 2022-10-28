const mongoose = require("mongoose")

var DieukhienSchema = new mongoose.Schema({
    name: String,
    status: String,
    origin: String,
    image: String,
    price: String,
    material: String

})

var DieukhienModel = mongoose.model('dieu khien', DieukhienSchema, 'dieukhien')
module.exports = DieukhienModel