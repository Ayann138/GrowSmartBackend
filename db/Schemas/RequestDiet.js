const mongoose = require('mongoose')
const validator = require('validator')

const dietSchema = new mongoose.Schema({
    name:{
        type: String,
        minLength: 4,
        require: true,
        trim: true
    },
    age:{
        type: Number
    },
    allergyDesc:{
        type: String

    },
    dietDecription:{
        type: String
    },
    parentId:{
        type: String,
        require: true
    },
    requestDate:{
        type:String
    },
    requestTime:{
        type:String
    },
    parentName:{
        type: String,
        require: true
    },
    nutritionId:{
        type: String,
        require: true
    },
})

const RequestDiet = new mongoose.model("dietRequest" , dietSchema)
module.exports = RequestDiet 