const express = require('express')
const User = require('../models/Users')
const Post = require('../models/Posts')
const Query = require('../models/Queries')
const router=express.Router()

router.get('/getAllUser' ,async (req,res) => {
    try{
        let users = await User.find()
        console.log(users)
        res.send(users)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

router.get('/RemoveUser/:id' ,async (req,res) => {
    try{
        let user = await User.findByIdAndDelete(req.params.id);
        let users = await User.find()
        res.send(users)
        console.log("User Removed")
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

router.get("/adminGetPosts", async (req, res) => {
    try{
        let Posts = await Post.find();
        if (Posts.length > 0) {
            res.send(Posts)
            console.log(Posts)
        } else {
            res.send("No Post Found!!")
        }
    }catch (err) {
        res.status(400).send({result: err});
    }
})

router.get("/adminGetQueries", async (req, res) => {
    try{
        let Queries = await Query.find();
        if (Queries.length > 0) {
            res.send(Queries)
            console.log(Queries)
        } else {
            res.send("No Post Found!!")
        }
    }catch (err) {
        res.status(400).send({result: err});
    }
})
module.exports=router;