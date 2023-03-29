const express = require('express');
const verifyToken = require('../Middleware/auth');
const feedback = require('../models/FeedBack')
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
module.exports = router