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
    productModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/student
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
            //var message = "Delete student succeed !";
            //redirect về trang /student (URL không phải view)
            res.redirect("/product");
        }
    })
})

//render ra form ADD
router.get('/add', (req, res) => {
    res.render("product/new");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    //Cách 1: dùng "save"
    // var student = new StudentModel(req.body)
    // student.save((err) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("Add student succeed !")
    //         res.redirect("/student")
    //     }
    // })
    //Cách 2: dùng "create"
    ProductModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add item succeed !')
            res.redirect("/product")
        }
    })
})

//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    ProductModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/student)
            //gửi kèm dữ liệu của object student để load vào form edit
            //student (tên) , data (dữ liệu)
            res.render("product/update", { product: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
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