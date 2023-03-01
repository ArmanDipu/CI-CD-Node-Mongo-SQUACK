const mongoose = require("mongoose")

const messegeSchema = mongoose.Schema({
    from :{
        required : true,
        type : String
    },
    to :{
        required : true,
        type : String
    },
    msg:{
        required : true,
        type : String
    }
})

module.exports = mongoose.model("messegeSchema", messegeSchema)