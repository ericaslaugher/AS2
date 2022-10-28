const express = require('express')
const ProductModel = require('../models/ProductModel')
const router = express.Router()


router.get('/drop', (req, res) => {
    ProductModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/product')
    })
})




router.get('/', (req, res) => {
    ProductModel.find((err, data) => {
        if (!err) {
           
            res.render('product/index', { product: data })
        }
    })
})

router.get('/list', (req, res) => {
    ProductModel.find((err, data) => {
        if (!err) {
            res.render('product/list', { product: data, })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    ProductModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete the item succeed !");
           
            res.redirect("/product");
        }
    })
})

router.get('/add', (req, res) => {
    res.render("product/new");
})


router.post('/add', (req, res) => {
   
    ProductModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add item succeed !')
            res.redirect("/product")
        }
    })
})


router.get('/edit/:id', (req, res) => {
    ProductModel.findById(req.params.id, (err, data) => {
        if (!err) {
           
            res.render("product/update", { product: data })
        }
    })
})


router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var product = req.body;
    ProductModel.findByIdAndUpdate(id, product, (err) => {
        if (!err) {
            console.log("Update item succeed !")
            res.redirect("/product")
        }
    })
})

router.get('/detail/:id', (req, res) => {
    ProductModel.findById(req.params.id, (err, product) => {
        if (!err) {
            res.render('product/info', { product: product })
        }
    })
})



//search function
router.post('/search', (req, res) => {
    ProductModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
        if (!err) {
            res.render('product/index', { product: data })
        }
    })
})
//sort function
router.get('/sort/asc', (req, res) => {
    ProductModel.find()
        .sort({ name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('product/index', { product: data })
            }
        })
})

router.get('/sort/desc', (req, res) => {
    ProductModel.find()
        .sort({ name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('product/index', { product: data })
            }
        })
})
module.exports = router