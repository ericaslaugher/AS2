const express = require('express')
const DieukhienModel = require('../models/DieukhienModel')
const router = express.Router()


router.get('/drop', (req, res) => {
    DieukhienModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/dieukhien')
    })
})




router.get('/', (req, res) => {
    DieukhienModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/student
            res.render('dieukhien/index', { dieukhien: data })
        }
    })
})

router.get('/list', (req, res) => {
    DieukhienModel.find((err, data) => {
        if (!err) {
            res.render('dieukhien/list', { dieukhien: data, })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    DieukhienModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete the item succeed !");
            //var message = "Delete student succeed !";
            //redirect về trang /student (URL không phải view)
            res.redirect("/dieukhien");
        }
    })
})

//render ra form ADD
router.get('/add', (req, res) => {
    res.render("dieukhien/new");
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
    DieukhienModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add item succeed !')
            res.redirect("/dieukhien")
        }
    })
})

//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    DieukhienModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/student)
            //gửi kèm dữ liệu của object student để load vào form edit
            //student (tên) , data (dữ liệu)
            res.render("dieukhien/update", { dieukhien: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var dieukhien = req.body;
    DieukhienModel.findByIdAndUpdate(id, dieukhien, (err) => {
        if (!err) {
            console.log("Update item succeed !")
            res.redirect("/dieukhien")
        }
    })
})

router.get('/detail/:id', (req, res) => {
    DieukhienModel.findById(req.params.id, (err, dieukhien) => {
        if (!err) {
            res.render('dieukhien/info', { dieukhien: dieukhien })
        }
    })
})



//search function
router.post('/search', (req, res) => {
    DieukhienModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
        if (!err) {
            res.render('dieukhien/index', { dieukhien: data })
        }
    })
})
//sort function
router.get('/sort/asc', (req, res) => {
    DieukhienModel.find()
        .sort({ name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('dieukhien/index', { dieukhien: data })
            }
        })
})

router.get('/sort/desc', (req, res) => {
    DieukhienModel.find()
        .sort({ name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('dieukhien/index', { dieukhien: data })
            }
        })
})
module.exports = router