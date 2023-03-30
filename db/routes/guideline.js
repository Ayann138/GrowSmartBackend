const express = require("express")
const router=express.Router()
const  nutPost= require('../models/NutritionGuidlines')
const upload = require('./multer')
const verifyToken = require('../Middleware/auth')
router.post("/addguideline",upload.single("nutpostPic"), async (req, res) => {
    try{
        let nutpostDecrption = req.body.nutpostDecrption;
        let NutritionName = req.body.NutritionName;
        let nutritionId = req.body.nutritionId;
        let nutprofilePic = req.body.nutprofilePic;
        let nutpostPic = req.file.path;
        let nutnewPost = new nutPost({nutpostDecrption: nutpostDecrption,NutritionName: NutritionName, nutritionId: nutritionId,nutprofilePic: nutprofilePic ,nutpostPic:nutpostPic})
        let result = await nutnewPost.save()
        result = result.toObject()
        res.send(result)

    }catch (err) {
        res.status(400).send({result: err});
    }
})
router.get("/getnutPosts", verifyToken, async (req, res) => {
    try{
        let nutposts = await nutPost.find();
        if (nutposts.length > 0) {
            res.send(nutposts)
            console.log(nutposts)
        } else {
            res.send("No Post Found!!")
        }
    }catch (err) {
        res.status(400).send({result: err});
    }
})

router.get("/getnutProfilePosts/:id", verifyToken, async (req, res) => {
    try{
        let nid = req.params.id;
        let nutposts = await nutPost.find({ nutritionId: nid });
        if (nutposts.length > 0) {
            res.send(nutposts)
        } else {
            res.send("Share posts first!!")
        }
    }catch (err) {
        res.status(400).send({result: err});
    }
})
router.post("/addnutPostComments/:id", verifyToken, async (req, res) => {
    try{
        let nid = req.params.id
        console.log(nid)
        console.log(req.body)
        let nutpostCurrent = await nutPost.findById(nid)
        nutpostCurrent.nutpostComment.push(req.body)
        const updatedPost = await nutPost.findByIdAndUpdate(nid , nutpostCurrent, { new: true })
        console.log(updatedPost)
        res.send(updatedPost)
    }catch (err) {
        res.status(400).send({result: err});
    }

})

router.get("/getnutPostComments/:id",verifyToken, async (req, res) => {
    try{
        let nid = req.params.id
        let nutpostCurrent = await nutPost.findById(nid)
        if(nutpostCurrent.nutpostComment.length > 0){
            res.send(nutpostCurrent.nutpostComment)
        }else{
            res.send("No comment on that post.")
        }
    }catch (err) {
        res.status(400).send({result: err});
    }

})

module.exports=router;