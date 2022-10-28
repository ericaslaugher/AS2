const express = require('express')
const StudentModel = require('../models/ProductModel')
const router = express.Router()

//view all: select * from student
router.get('/', (req, res) => {
   StudentModel.find((err, data) => {
      if (!err) {
         res.json(data)
      }
   })
})

//view by id : select * from student where _id = 'id'
router.get('/:id', (req, res) => {
   StudentModel.findById(req.params.id, (err, data) => {
      if (!err) {
         res.json(data)
      }
   })
})

//delete: delete from student where _id = 'id'
router.delete('/:id', (req, res) => {
   StudentModel.findByIdAndDelete(req.params.id, (err) => {
      if (!err) {
         //res.send("Delete student succeed !")
         res.json({ "message": "delete student succeed" })
      }
   })
})

//add: insert (...) values (...) into student 
router.post('/', (req, res) => {
   StudentModel.create(req.body, (err, data) => {
      if (!err) {
         res.json(data)
      }
   })
})

//update: update from student where _id = "id"
router.put('/:id', (req, res) => {
   StudentModel.findByIdAndUpdate(req.params.id, req.body,
      (err, data) => {
         if (!err) {
            res.json(data)
         }
      })
})

module.exports = router