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
           
            res.redirect("/figure");
        }
    })
})


router.get('/add', (req, res) => {
    res.render("figure/new");
})


router.post('/add', (req, res) => {
   
    FigureModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add item succeed !')
            res.redirect("/figure")
        }
    })
})


router.get('/edit/:id', (req, res) => {
    FigureModel.findById(req.params.id, (err, data) => {
        if (!err) {
            
            res.render("figure/update", { figure: data })
        }
    })
})


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




router.post('/search', (req, res) => {
    FigureModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
        if (!err) {
            res.render('figure/index', { figure: data })
        }
    })
})

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