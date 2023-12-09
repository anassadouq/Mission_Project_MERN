const mongoose = require("mongoose");

const MissionsSchema = new mongoose.Schema({
    description:{
        type:String,
    },
    deadline:{
        type:Date,
    },    
    isCompleted:{
        type:String,
    },
})

const MissionsModel = mongoose.model("mission", MissionsSchema)
module.exports = MissionsModel