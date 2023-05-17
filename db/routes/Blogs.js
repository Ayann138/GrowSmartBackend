const express = require('express')
const router = express.Router();
const verifyToken = require("../Middleware/auth");
const upload = require('./multer')
const blog = require("../models/blogs");

router.post('/addBlog' , async(req,res)=>{
    try {
        let newBlog = new blog(req.body);
        let result = await newBlog.save();
        result = result.toObject();
        //console.log(result)
        res.send(result);
      } catch (err) {
        res.status(400).send({ result: err });
      } 
})
router.get("/getBlogs", verifyToken, async (req, res) => {
    try {
      let Blogs = await blog.find();
      if (Blogs.length > 0) {
       // console.log(Blogs)
        res.send(Blogs);

      } else {
        res.send("No Blog Added!!");
      }
    } catch (err) {
      res.status(400).send({ result: err });
    }
  });

  router.get("/deleteBlog/:id", async (req, res) => {
    try {
      const Blogs = await blog.findByIdAndDelete(req.params.id);
      let blogss = await Blogs.find()
      res.send(blogss)
    } catch (err) {
      res.status(401).send(err);
    }
  });
module.exports = router