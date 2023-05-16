const mongoose = require('mongoose')
const moment = require('moment');
 const querySchema = new mongoose.Schema({
    queryContent:{
        type: String,
        require: true,
    },
    category:{
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
    profilePic:{
        type: String
    },
    queryLikeS:[{
        likedBy:String,
        likedById:String
    }],
    querydate:{
        type: String,
        default: Date.now
    },
    queryComment:[{
        queryId: String,
        commentText: String,
        commentedBy: String,
        pic: String
    }]
 })
 querySchema.virtual('queryDateAgo').get(function() {
    return moment(this.queryDate).fromNow();
  });
 const Query = new mongoose.model("queries" , querySchema)
 module.exports = Query 