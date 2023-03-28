const mongoose = require('mongoose')
const nutritionDetailsSchema = new mongoose.Schema({
    nutritionId:{
        type: String,
        require: true
    },
    nutritionName:{
        type: String,
        require: true
    },
    email:{
        type: String
    },
    phoneNo:{
        type: String
    },
    fee:{
        type: String
    },
    Education:{
        type: String
    },
    Experience:{
        type: String
    },
    Cnic:{
        type: Number,
        require: true
    },
    Resume:{
        type: String
    },
    approveStatus:{
        type: String
    }

})
const NutritionDetail = new mongoose.model("NutritionDetails" , nutritionDetailsSchema)
module.exports = NutritionDetail