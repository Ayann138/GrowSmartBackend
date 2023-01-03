const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator");
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        minLength: 4,
        require: true,
        trim: true
    },
    email: {
        required: true,
        type: String,
        unique: [true , "Email Is Already Presnet"],
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }

    },
    phone:{
        required:true , 
        type: Number,
        minLength: 10,
        unique: true
    },
    role:{
        type: String
    },
    password:{
        type: String,
        required: true
    },
})
//use for hashing password
userSchema.pre("save" , async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 10)
        next();
    }
})
const User = new mongoose.model("users" , userSchema)
module.exports = User;