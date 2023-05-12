const express = require("express")
const router=express.Router()
const nutriDetails = require("../models/NutritionDetails");
const verifyToken = require('../Middleware/auth')
const user = require("../models/Users")
const feedback = require('../models/FeedBack')
router.get("/nutritionProfiles", verifyToken, async (req, res) => {
    try{
        let nutrition = await nutriDetails.find({ approveStatus: "Approved" })
        res.send(nutrition)
    }catch (err) {
        res.status(400).send({result: err});
    }

})
router.get("/nutrition/:id", verifyToken, async (req, res) => {
    try{
        let nutrition = await user.find({ _id: req.params.id })
        console.log(nutrition)
        res.send(nutrition)
    }catch (err) {
        res.status(400).send({result: err});
    }

})

router.get('/getFeedback/:id', async (req, res) => {
    try{
        let nutFeedBack = await feedback.find({nutritionId: req.params.id})
        res.send(nutFeedBack)
    }catch(err){
        res.send(err)        
    }
})
module.exports=router;