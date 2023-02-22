const mongoose = require('mongoose')
 const postSchema = new mongoose.Schema({
    postDecrption:{
        type: String
    },
    postPic:{
        type: String,
        require: true
    },
    profilePic:{
        type: String,
        require: true
    },
    parentName:{
        type: String,
        require: true
    },
    parentId:{
        type: String,
        require: true
    },
    postLikes:[{
        likedBy:String,
        likedById:String
    }],
    postdate:{
        type: Date
    },
    postComment:[{
        commentText: String,
        commentedBy: String,
        profilePic: String
    }]
 })

 const Post = new mongoose.model("Posts" , postSchema)
 module.exports = Post 