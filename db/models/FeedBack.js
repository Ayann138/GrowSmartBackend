const mongoose = require("mongoose")
const dietReceiveSchema = new mongoose.Schema({
    nutritionId:{
        type: String,
    },
    feedback:{
        type: String,
        requre: true
    },
    parentName:{
        type: String,
        requre: true
    }


})

const dietReceive = new mongoose.model("nutritionFeedBack" , dietReceiveSchema)
module.exports = dietReceive 
