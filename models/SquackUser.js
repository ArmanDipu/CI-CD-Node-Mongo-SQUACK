const mongoose = require("mongoose")

const SquackUserSchema = mongoose.Schema({
    name:{
        type: String
    }
})

module.exports = mongoose.model("SquackUserSchema", SquackUserSchema)