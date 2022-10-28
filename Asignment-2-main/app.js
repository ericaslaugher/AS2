var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var productRouter = require('./routes/product')
var figureRouter = require('./routes/figure')
var apiRouter = require('./routes/api')


var mongoose = require('mongoose')
var url ='mongodb+srv://user123:minhbeo223@cluster0.u9ccc9w.mongodb.net/test'

mongoose.connect(url, { useNewUrlParser: true }, err => {
    if (!err) {
        console.log('DB connect succeed !')
    } else {
        console.error(err)
    }
})

var hbs = require('hbs')
hbs.registerHelper('dateFormat', require('handlebars-dateformat'))
hbs.registerHelper('equal', require('handlebars-helper-equal'))

var app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')



var cors = require('cors')
app.use(cors())


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/product', productRouter)
app.use('/figure', figureRouter)
app.use('/api', apiRouter)



app.use(function (req, res, next) {
    next(createError(404))
})


app.use(function (err, req, res, next) {
    
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    
    res.status(err.status || 500)
    res.render('error')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('http://localhost:3000')
})

module.exports = app