const express = require('express')
const XephinhModel = require('../models/XephinhModel')
const router = express.Router()


router.get('/drop', (req, res) => {
    XephinhModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/xephinh')
    })
})




router.get('/', (req, res) => {
    XephinhModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/student
            res.render('xephinh/index', { xephinh: data })
        }
    })
})

router.get('/list', (req, res) => {
    XephinhModel.find((err, data) => {
        if (!err) {
            res.render('xephinh/list', { xephinh: data, })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    XephinhModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete the item succeed !");
            //var message = "Delete student succeed !";
            //redirect về trang /student (URL không phải view)
            res.redirect("/xephinh");
        }
    })
})

//render ra form ADD
router.get('/add', (req, res) => {
    res.render("xephinh/new");
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
    XephinhModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add item succeed !')
            res.redirect("/xephinh")
        }
    })
})

//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    XephinhModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/student)
            //gửi kèm dữ liệu của object student để load vào form edit
            //student (tên) , data (dữ liệu)
            res.render("xephinh/update", { xephinh: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var xephinh = req.body;
    XephinhModel.findByIdAndUpdate(id, xephinh, (err) => {
        if (!err) {
            console.log("Update item succeed !")
            res.redirect("/xephinh")
        }
    })
})

router.get('/detail/:id', (req, res) => {
    XephinhModel.findById(req.params.id, (err, xephinh) => {
        if (!err) {
            res.render('xephinh/info', { xephinh: xephinh })
        }
    })
})



//search function
router.post('/search', (req, res) => {
    XephinhModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
        if (!err) {
            res.render('xephinh/index', { xephinh: data })
        }
    })
})
//sort function
router.get('/sort/asc', (req, res) => {
    XephinhModel.find()
        .sort({ name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('xephinh/index', { xephinh: data })
            }
        })
})

router.get('/sort/desc', (req, res) => {
    XephinhModel.find()
        .sort({ name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('xephinh/index', { xephinh: data })
            }
        })
})
module.exports = router