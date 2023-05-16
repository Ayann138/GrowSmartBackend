const mongoose = require('mongoose')
const moment = require('moment');
 const blogSchema = new mongoose.Schema({
    blogContent:{
        type: String,
        require: true,
    },
    blogCategory:{
        type: String,
        require: true
    },
    blogTitle:{
        type: String,
        require: true
    },
    role:{
        type: String
    },
    name:{
        type: String
    },
    dateUploaded:{
        type: String,
    },
 })
 const Blogs = new mongoose.model("blogs" , blogSchema)
 module.exports = Blogs