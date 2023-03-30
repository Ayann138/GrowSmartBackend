const mongoose = require("mongoose")
const ratingSchema = new mongoose.Schema({
    parentId:{
        type: String
    },
    parentName:{
        type: String
    },
    ratingStar:{
        type: String,
        required: true
    },
})

const Rating = new mongoose.model("rating" , ratingSchema)
module.exports = Rating;