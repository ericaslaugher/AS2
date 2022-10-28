const express = require('express')
const FigureModel = require('../models/FigureModel')
const router = express.Router()


router.get('/drop', (req, res) => {
    FigureModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/figure')
    })
})




router.get('/', (req, res) => {
    FigureModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/student
            res.render('figure/index', { figure: data })
        }
    })
})

router.get('/list', (req, res) => {
    FigureModel.find((err, data) => {
        if (!err) {
            res.render('figure/list', { figure: data, })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    FigureModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete the item succeed !");
            //var message = "Delete student succeed !";
            //redirect về trang /student (URL không phải view)
            res.redirect("/figure");
        }
    })
})

//render ra form ADD
router.get('/add', (req, res) => {
    res.render("figure/new");
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
    FigureModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add item succeed !')
            res.redirect("/figure")
        }
    })
})

//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    FigureModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/student)
            //gửi kèm dữ liệu của object student để load vào form edit
            //student (tên) , data (dữ liệu)
            res.render("figure/update", { figure: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var figure = req.body;
    FigureModel.findByIdAndUpdate(id, figure, (err) => {
        if (!err) {
            console.log("Update item succeed !")
            res.redirect("/figure")
        }
    })
})

router.get('/detail/:id', (req, res) => {
FigureModel.findById(req.params.id, (err, figure) => {
        if (!err) {
            res.render('figure/info', { figure: figure })
        }
    })
})



//search function
router.post('/search', (req, res) => {
    FigureModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
        if (!err) {
            res.render('figure/index', { figure: data })
        }
    })
})
//sort function
router.get('/sort/asc', (req, res) => {
    FigureModel.find()
        .sort({ name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('figure/index', { figure: data })
            }
        })
})

router.get('/sort/desc', (req, res) => {
    FigureModel.find()
        .sort({ name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('figure/index', { figure: data })
            }
        })
})
module.exports = router