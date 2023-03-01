const squackUserModel = require("../models/SquackUser")
const messegeModel = require("../models/messeges.js")

const getIndexPage = async (req,res)=>{
    let data = []
    let msgs = []
    let users = []
    var currentUser
    let filteredMsg = []

    try{
        data = await messegeModel.find()

        data.forEach((messegeSchema)=>{
            msgs.push({from: messegeSchema.from, to: messegeSchema.to, msg: messegeSchema.msg})
        })

        data = await squackUserModel.find()
        data.forEach((SquackUserSchema)=>{
            users.push({name: SquackUserSchema.name})
        })

        currentUser = msgs[msgs.length-1].from

        data = await messegeModel.find({$or:[{from:currentUser},{to:currentUser},{to:"all"}]})
        data.forEach((messegeSchema)=>{
            filteredMsg.push({from: messegeSchema.from,to: messegeSchema.to, msg: messegeSchema.msg})
        })

    }catch(err){
        console.log(err)
    }finally{
        res.render("index",{msgs:filteredMsg , users:users, currentUser})
    }
}

const postMessege = (req,res) =>{

    const data = new messegeModel({
        from: req.body.from,
        to: req.body.to,
        msg: req.body.msg
    })
    data.save().then(()=>{
        console.log(data)
    }).catch((err)=>console.log(err)).finally(()=>{
        res.redirect("/")
    })
    this.currentUser =  req.body.from
}

const refresh = (req,res) =>{
    console.log("Refreshing...")
    messegeModel.remove( { msg : { $nin: "👾😇Happy Messaging😇👾" }}).then(()=>{
        res.redirect("/")
    })
}


module.exports = {getIndexPage, postMessege, refresh}