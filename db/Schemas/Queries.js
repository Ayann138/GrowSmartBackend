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
        type:String
    }]
 })

 const Query = new mongoose.model("queries" , querySchema)
 module.exports = Query 