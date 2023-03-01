const express = require("express")
const router=express.Router()
const verifyToken = require('../Middleware/auth')
const query = require("../models/Queries")
router.post("/addQuery", async (req, res) => {
    console.log(req.file);
    console.log(req.body);
    try{
        // let queryContent = req.body.queryContent;
        // let parentName = req.body.parentName;
        // let parentId = req.body.parentId;
        // let profilePic = req.file.path;
        // let querydate = req.body.querydate;
      //  let Query = new query({queryContent: queryContent,profilePic: profilePic, parentName: parentName, parentId: parentId,querydate: querydate })
      let Query = new query(req.body)

        let result = await Query.save()
        result = result.toObject()
        res.send(result)
    }catch (err) {
        res.status(400).send({result: err});
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