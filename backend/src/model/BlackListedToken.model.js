const mongoose = require("mongoose");


const blackListSchema= new mongoose.Schema({
    token:{
        type:String,
        required:[true,"tkoen is required to be blacklisted"]
    }
},{timestamps: true})

const blackListModel= mongoose.model("blackListModel",blackListSchema);

module.exports= blackListModel;