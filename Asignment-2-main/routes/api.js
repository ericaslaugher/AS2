const express = require('express')
const ProductModel = require('../models/ProductModel')
const router = express.Router()


router.get('/', (req, res) => {
   ProductModel.find((err, data) => {
      if (!err) {
         res.json(data)
      }
   })
})


router.get('/:id', (req, res) => {
   ProductModel.findById(req.params.id, (err, data) => {
      if (!err) {
         res.json(data)
      }
   })
})


router.delete('/:id', (req, res) => {
   ProductModel.findByIdAndDelete(req.params.id, (err) => {
      if (!err) {
         
         res.json({ "message": "delete product succeed" })
      }
   })
})


router.post('/', (req, res) => {
   ProductModel.create(req.body, (err, data) => {
      if (!err) {
         res.json(data)
      }
   })
})


router.put('/:id', (req, res) => {
   ProductModel.findByIdAndUpdate(req.params.id, req.body,
      (err, data) => {
         if (!err) {
            res.json(data)
         }
      })
})

module.exports = router