const mongoose = require("mongoose")

var FigureSchema = new mongoose.Schema({
    name: String,
    status: String,
    origin: String,
    image: String,
    price: String,
    material: String

})

var FigureModel = mongoose.model('figure', FigureSchema, 'figure')
module.exports = FigureModel