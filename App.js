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

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(router)
app.set("view engine", "ejs")
app.set("views", __dirname+"/views")

app.listen(port,()=>{
    console.log(`Squack is running at http://localhost:${port}`)
})