const mongoose = require("mongoose")
const DietPlanSchema = new mongoose.Schema({
    nutritionId:{
        type: String,
        require: true
    },
    parentId:{
        type: String,
        require: true
    },
    dietRequestId:{
        type: String,
        require: true
    },
    dietDescription:{
        type: String,
        requre: true
    },
    dietCalories:{
        type: String,
    },
    dietTime:{
        type: String
    }


})
