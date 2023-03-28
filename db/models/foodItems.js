const mongoose = require('mongoose')
const foodSchema = new mongoose.Schema({
    Food:{
        type: String,
        require: true
    },
    Quantity:{
        type: String,
        require: true
    },
    Weigth:{
        type: String
    },
    Calories:{
        type: String
    },
    Carbs:{
        type: String
    },
    Category:{
        type: String
    }

})
const food = new mongoose.model("dietFood" , foodSchema)
module.exports = food