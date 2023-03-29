const mongoose = require("mongoose")
const dietReceiveSchema = new mongoose.Schema({
    dietRequestId:{
        type: String,
    },
    dietDecription:{
        type: String,
        requre: true
    },
    foodItem:[{
        Food: String,
        Quantity: String,
        Weight: String,
        Calories: String,
        Carbs: String,
        Category: String
    }]


})

const dietReceive = new mongoose.model("dietReceive" , dietReceiveSchema)
module.exports = dietReceive 