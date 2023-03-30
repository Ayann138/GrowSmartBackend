const express = require("express")
const router=express.Router()
const nutriDetails = require("../models/NutritionDetails");
const verifyToken = require('../Middleware/auth')
const user = require("../models/Users")
const dietRequest = require("../models/RequestDiet")
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
router.get("/getDietRequests/:id", async(req,res) =>{
    try{
        let nid = req.params.id
        let result = await dietRequest.find({ nutritionId: nid })
        console.log(result)
        res.send(result)
    } catch (err) {
        res.status(400).send({result: "error in catch" + err});
    }
    

})

router.get("/updateDietRequests/:id", async(req,res) =>{
    try{
        let id = req.params.id;
        let updatedRequest = await dietRequest.updateOne({_id: id},{ $set: { approved: "Yes" }} )
        res.send(updatedRequest)
    } catch (err) {
        res.status(400).send({result: "error in catch" + err});
    }
    

})

router.get('/getDietDietRequest/:id/:nid', async(req, res) => {
    try{
        const userId = req.params.id;
        const nutId = req.params.nid
        const DietRequest = await dietRequest.findOne({ parentId: userId, nutritionId: nutId });
        console.log(DietRequest)
         res.send(DietRequest)
 
    }catch(err){
        res.status(400).send({result: err});
    }
})
module.exports=router;