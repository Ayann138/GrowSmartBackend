const express = require("express")
const router=express.Router()
const Post = require('../models/Posts')
const upload = require('./multer')
const verifyToken = require('../Middleware/auth')
router.post("/addPost",upload.single("postPic"), async (req, res) => {
    try{
        let postDecrption = req.body.postDecrption;
        let parentName = req.body.parentName;
        let parentId = req.body.parentId;
        let profilePic = req.body.profilePic;
        let postdate = req.body.postdate
        let postPic = req.file.path;
        let newPost = new Post({postDecrption: postDecrption,postPic: postPic, parentName: parentName, parentId: parentId, postdate: postdate ,profilePic:profilePic})
        let result = await newPost.save()
        result = result.toObject()
        res.send(result)

    }catch (err) {
        res.status(400).send({result: err});
    }
})
router.get("/getPosts", verifyToken, async (req, res) => {
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
router.get("/deletePost/:id", verifyToken, async (req, res) => {
    try {
      const quer = await Post.findByIdAndDelete(req.params.id);
      let Posts = await Post.find()
      res.send(Posts)
    } catch (err) {
      res.status(401).send(err);
    }
  });
router.get("/getProfilePosts/:id", verifyToken, async (req, res) => {
    try{
        let id = req.params.id;
        let Posts = await Post.find({ parentId: id });
        if (Posts.length > 0) {
            res.send(Posts)
        } else {
            res.send("Share posts first!!")
        }
    }catch (err) {
        res.status(400).send({result: err});
    }
})
router.post("/addPostComments/:id", verifyToken, async (req, res) => {
    try{
        let id = req.params.id
        console.log(id)
        console.log(req.body)
        let postCurrent = await Post.findById(id)
        postCurrent.postComment.push(req.body)
        const updatedPost = await Post.findByIdAndUpdate(id , postCurrent, { new: true })
        console.log(updatedPost)
        res.send(updatedPost)
    }catch (err) {
        res.status(400).send({result: err});
    }

})
router.get("/getPostComments/:id",verifyToken, async (req, res) => {
    try{
        let id = req.params.id
        let postCurrent = await Post.findById(id)
        if(postCurrent.postComment.length > 0){
            res.send(postCurrent.postComment)
        }else{
            res.send("No comment on that post.")
        }
    }catch (err) {
        res.status(400).send({result: err});
    }

})
router.post("/plike/:id", async (req, res) => {
    try {
      const queryCurrent = await Post.findById(req.params.id);
      if (!queryCurrent) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      //Check if the query has already been liked by the user
      const alreadyLiked = queryCurrent.postLikes.some(
        (like) => like.likedById === req.body.likedById
      );
  
      if (alreadyLiked) {
        return res
          .status(400)
          .json({ message: "Query already liked by this user" });
      }
      queryCurrent.postLikes.push({
        likedBy: req.body.likedBy,
        likedById: req.body.likedById,
      });
  
      await queryCurrent.save();
      res.json(queryCurrent);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });
module.exports=router;