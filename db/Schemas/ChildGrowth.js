const mongoose = require("mongoose")

const ChildSchema = new mongoose.Schema({
    childName: {
        type: String,
        minLength: 4,
        require: true
    },
    childUsername:{
        type: String,
        minLength: 4,
        require: true,
        unique: [true , "Child Username Is Already Presnet"],
    },
    Age: {
        type: Number,
        required: true
    },
    dathOfBirth:{
        type: Date,
        require: true
    },
    Height:{
        type: Number,
        require: true
    },
    Weight:{
        type: Number,
        require: true
    },
    headCircum:{
        type: Number,
        require: true
    },
    parentId:{
        type: String,
        require: true
    },
    trackParameters:[{
        height: Number,
        weight: Number,
        headCircumference: Number,
        TrackDate: String,
        BMI: Number
    }],
})

const Child = new mongoose.model("ChildInfo" , ChildSchema)
module.exports = Child 