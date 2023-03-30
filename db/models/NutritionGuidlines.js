const mongoose = require('mongoose')
 const GuidelineSchema = new mongoose.Schema({
    nutpostDecrption:{
        type: String
    },
    nutpostPic:{
        type: String,
        require: true
    },
    nutprofilePic:{
        type: String,
        require: true
    },
    NutritionName:{
        type: String,
        require: true
    },
    nutritionId:{
        type: String,
        require: true
    },
    nutpostLikes:[{
        likedBy:String,
        likedById:String
    }],
    nutpostdate:{
        type: Date
    },
    nutpostComment:[{
        commentText: String,
        commentedBy: String,
        profilePic: String
    }]
 })

 const NutritionGuidline = new mongoose.model("NutritionGuidlines" , GuidelineSchema)
 module.exports = NutritionGuidline