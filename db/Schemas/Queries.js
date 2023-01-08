const mongoose = require('mongoose')
 const querySchema = new mongoose.Schema({
    queryContent:{
        type: String,
        require: true,
    },
    parentName:{
        type: String,
        require: true
    },
    parentId:{
        type: String,
        require: true
    },
    queryLikeS:[{
        likedBy:String,
        likedById:String
    }],
    querydate:{
        type: Date
    },
    queryComment:[{
        queryId: String,
        commentText: String,
        commentedBy: String
    }]
 })

 const Query = new mongoose.model("queries" , querySchema)
 module.exports = Query 