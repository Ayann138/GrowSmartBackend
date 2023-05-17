const mongoose = require("mongoose")
const paymentSchema = new mongoose.Schema({
    parentId:{
        type: String
    },
    parentName:{
        type: String
    },
    NutritionId:{
        type: String,
        required: true
    },
    dietplanId:{
        type: String
    },
    paymentDate:{
        type: String
    },
    paymentAmount:{
        type: Number
    }
})

const Payment = new mongoose.model("Payment" , paymentSchema)
module.exports = Payment;