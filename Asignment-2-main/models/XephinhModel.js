const mongoose = require("mongoose")

var XephinhSchema = new mongoose.Schema({
    name: String,
    status: String,
    origin: String,
    image: String,
    price: String,
    material: String

})

var XephinhModel = mongoose.model('xep hinh', XephinhSchema, 'xephinh')
module.exports = XephinhModel