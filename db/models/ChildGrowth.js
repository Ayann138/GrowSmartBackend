const mongoose = require("mongoose")

const ChildSchema = new mongoose.Schema({
    childName: {
        type: String,
        minLength: 4,
        require: true
    },
    Age: {
        type: Number,
        required: true
    },
    dathOfBirth:{
        type: Date,
        require: true
    },
    gender:{
        type: String,
        require: true
    },
    parentId:{
        type: String,
        require: true
    },
    trackParameters:[{
        TrackDate: String,
        BMI: Number
    }],
})

const Child = new mongoose.model("ChildInfo" , ChildSchema)
module.exports = Child 