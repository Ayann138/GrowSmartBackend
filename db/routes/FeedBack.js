const express = require('express');
const verifyToken = require('../Middleware/auth');
const feedback = require('../models/FeedBack')
const user = require("../models/Users")
const nutriDetails = require("../models/NutritionDetails");

const router  = express.Router();

router.post('/giveFeedBack', verifyToken , async (req,res)=>{
    try{
        let FeedBack = new feedback(req.body)
        let result = await FeedBack.save();
        console.log(result)
        res.send(result)
    }catch(err){
        res.status(400).send({result: err});
    }
})

router.get('/viewFeedBack/:nutId' , async(req,res) => {
    try{
        const nutFeedBacks = await feedback.find({nutritionId: req.params.nutId})
        res.send(nutFeedBacks)
    }catch(err){

    }
})
router.get('/postNutriRating/:id/:stars' ,verifyToken, async(req,res) =>{
    try{
        let uid = req.params.id
        let result = await nutriDetails.find({nutritionId: uid})
        
        let id = result[0]._id
        const stars = parseInt(req.params.stars, 10) || 0; 
        const rev = parseInt(result[0].reviews , 10) || 0; 
        console.log(result[0].rating + stars)
        const newRating = result[0].rating + stars
        const newReviews = rev + 1
        let updatedRating = await nutriDetails.updateOne({_id: id},{ $set: { rating: newRating, reviews: newReviews }} )
        console.log(updatedRating)
        res.send({updatedRating})
    }catch(err){
        console.log(err)
        res.send(err)
    }
})
module.exports = router