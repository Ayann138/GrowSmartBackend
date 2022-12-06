const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        minLength: 4,
        require: true,
        trim: true
    },
    email: {
        type: String , 
        required: true,
        unique: [true , "Email Is Already Present"],
        lowercase: true,

    },
    phone:{
        required:true , 
        type: Number,
        minLength: 10,
        unique: true
    },
    role:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
})
const User = new mongoose.model("users" , userSchema)
module.exports = User;