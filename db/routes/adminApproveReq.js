const express = require('express')
const nutriDetails = require('../models/NutritionDetails')

const router = express.Router()
router.get('/getRequests' , async(req,res) => {
    try{
        let nutRequest = await nutriDetails.find({approveStatus: false})
        res.send(nutRequest)
        console.log(nutRequest)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

router.get('/approveRequests/:id', async(req,res) => {
    try{
        let id = req.params.id;
        let nutRequest = await nutriDetails.updateOne({_id, id},{ $set: { approveStatus: True }} )
        res.send(nutRequest)
        console.log(nutRequest)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})
module.exports=router;