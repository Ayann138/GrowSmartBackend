const express = require("express")
const router=express.Router()
const verifyToken = require('../Middleware/auth');
const query = require("../models/Queries")
var Filter = require('bad-words'),
filter = new Filter();
filter.addWords('bullshit')
router.post("/addQuery", async (req, res) => {
    let count = 0;
    var queryContent = filter.clean(req.body.queryContent)
    for(let i = 0 ; i < queryContent.length; i++){
        if(queryContent[i] == "*"){
            count += 1
        }   
    }
    if(count == 0){
        try{
            let Query = new query(req.body)
      
              let result = await Query.save()
              result = result.toObject()
              res.send(result)
          }catch (err) {
              res.status(400).send({result: err});
          }
    }else{
        console.log("Query contains impropriate words")
        res.send("Query contains impropriate words")
    }
})
router.get("/getQueries", verifyToken, async (req, res) => {
    try{
        let queries = await query.find();
        if (queries.length > 0) {
            res.send(queries)
        } else {
            res.send("No Query Found!!")
        }
    }catch (err) {
        res.status(400).send({result: err});
    }
})
router.get("/deleteQuery/:id",verifyToken,  async(req, res) => { 
    try{
        const query =  await query.findByIdAndDelete(req.params.id);
        res.send("Query Deleted")
    }catch(err){
        res.status(401).send(err)
    }
})
router.get("/getProfileQueries/:id", verifyToken, async (req, res) => {
    try{
        let id = req.params.id;
        let Queries = await query.find({ parentId: id });
        if (Queries.length > 0) {
            res.send(Queries)
        } else {
            res.send("Share posts first!!")
        }
    }catch (err) {
        res.status(400).send({result: err});
    }
})
router.post("/addComment", verifyToken, async (req, res) => {
    try{
        let id = req.body.queryId
        const queryCurrent = await query.findById(id)
        queryCurrent.queryComment.push(req.body)
        const updatedQuery = await query.findByIdAndUpdate(id, queryCurrent, { new: true })
        res.send(updatedQuery)
    }catch (err) {
        res.status(400).send({result: err});
    }

})
router.get("/getComments/:id", verifyToken, async (req, res) => {
    try{
        let id = req.params.id
        // console.log(id , "From get comments")
        const queryCurrent = await query.findById(id)
        if (queryCurrent.queryComment.length > 0) {
            res.send(queryCurrent.queryComment)
        } else {
            res.send("Nooooo")
        }
    }catch (err) {
        res.status(400).send({result: err});
    }
})

router.post("/addlike/:id", verifyToken, async (req, res) => {
    try{
        let id = req.params.id
        const queryCurrent = await query.findById(id)
        queryCurrent.queryLikeS.push(req.body)
        const updatedQuery = await query.findByIdAndUpdate(id, queryCurrent, { new: true })
        res.send({updatedQuery})
    }catch (err) {
        res.status(400).send({result: err});
    }

})

router.post("/removelike/:id", verifyToken, async (req, res) => {
    try{
        let id = req.body.queryId
        const queryCurrent = await query.findById(id)
        queryCurrent.queryLikes.pull(req.body)
        const updatedQuery = await query.findByIdAndUpdate(id, queryCurrent, { new: true })
        res.send({updatedQuery})
    }catch (err) {
        res.status(400).send({result: err});
    }

})
module.exports=router;