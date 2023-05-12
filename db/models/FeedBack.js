const mongoose = require("mongoose")
const dietReceiveSchema = new mongoose.Schema({
    nutritionId:{
        type: String,
    },
    feedback:{
        type: String,
        require: true
    },
    stars:{
        type: Number,
        require: true
    },
    parentName:{
        type: String,
        require: true
    }


})

const dietReceive = new mongoose.model("nutritionFeedBack" , dietReceiveSchema)
module.exports = dietReceive 
