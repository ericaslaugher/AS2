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
var url =
    'mongodb+srv:mongodb+srv:minhbeo223@cluster0.u9ccc9w.mongodb.net/App'

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

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')


//Module dùng cho trao đổi dữ liệu API với front-end
//Note: cần cài đặt package "cors" trước
//cmd: npm install cors
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


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('http://localhost:3000')
})

module.exports = app