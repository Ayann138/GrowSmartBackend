const express = require('express')
const nutriDetails = require('../models/NutritionDetails')
const router = express.Router()
router.get('/getRequests' , async(req,res) => {
    try{
        let nutRequest = await nutriDetails.find({approveStatus: "Pending"})
        res.send(nutRequest)
        console.log(nutRequest)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

router.post('/approveRequests/:id', async(req,res) => {
    try{
        let id = req.params.id;
        let status = req.body.status
        console.log(status)
        let nutRequest = await nutriDetails.updateOne({nutritionId: id},{ $set: { approveStatus: status }} )
        console.log(nutRequest)
        res.send(nutRequest)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})
module.exports=router;