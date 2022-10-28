const express = require('express')
const ProductModel = require('../models/ProductModel')
const router = express.Router()

//view all: select * from student
router.get('/', (req, res) => {
   ProductModel.find((err, data) => {
      if (!err) {
         res.json(data)
      }
   })
})

//view by id : select * from student where _id = 'id'
router.get('/:id', (req, res) => {
   ProductModel.findById(req.params.id, (err, data) => {
      if (!err) {
         res.json(data)
      }
   })
})

//delete: delete from student where _id = 'id'
router.delete('/:id', (req, res) => {
   ProductModel.findByIdAndDelete(req.params.id, (err) => {
      if (!err) {
         //res.send("Delete student succeed !")
         res.json({ "message": "delete product succeed" })
      }
   })
})

//add: insert (...) values (...) into student 
router.post('/', (req, res) => {
   ProductModel.create(req.body, (err, data) => {
      if (!err) {
         res.json(data)
      }
   })
})

//update: update from student where _id = "id"
router.put('/:id', (req, res) => {
   ProductModel.findByIdAndUpdate(req.params.id, req.body,
      (err, data) => {
         if (!err) {
            res.json(data)
         }
      })
})

module.exports = router