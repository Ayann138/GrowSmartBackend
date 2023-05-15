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
    dateUploaded:{
        type: String,
        default: Date.now
    },
 })
 const Blogs = new mongoose.model("blogs" , blogSchema)
 module.exports = Blogs