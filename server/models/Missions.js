const mongoose = require("mongoose");

const MissionsSchema = new mongoose.Schema({
    description:{
        type:String,
    },
    priority:{
        type:String,
    },
    deadline:{
        type:Date,
    },    
    status:{
        type:String,
    },
})

const MissionsModel = mongoose.model("mission", MissionsSchema)
module.exports = MissionsModel