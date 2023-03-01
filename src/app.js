var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var data = require('./data');

require("dotenv").config()

const express = require("express")
const router = require("./routes")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

database_url = process.env.DATABASE_URL
mongoose.connect(database_url).then(()=>{
    console.log("Database Connected.")
}).catch((err)=>{
    console.log(err)
})

const port = 3000
const app = express()

app.use(logger('dev'));
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/', router)
app.set("view engine", "ejs")
app.set("views",path.join(__dirname+"/views"))

const {format} = require("date-fns")
app.locals.format = format;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
  
// error handler
app.use(function(err, req, res, next){
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


app.listen(port,()=>{
    console.log(`Squack is running at http://localhost:${port}`)
})