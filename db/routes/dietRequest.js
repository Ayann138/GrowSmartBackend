const express = require("express")
const router=express.Router()
const dietRequest = require("../models/RequestDiet")
require('../config')
const verifyToken = require('../Middleware/auth')

router.post("/addDietRequest", verifyToken, async (req, res) => {
    try{
        let dietReq = new dietRequest(req.body)
        let result = await dietReq.save()
        console.log(result)
        res.send(result)
    } catch (err) {
        res.status(400).send({result: "error in catch" + err});
    }
    
})
router.get("/getDietRequests/:id", async(req,res) =>{
    try{
        let nid = req.params.id
        let result = await dietRequest.find({ nutritionId: nid })
        console.log(result)
        res.send(result)
    } catch (err) {
        console.log(err)
        res.status(400).send({result: "error in catch" + err});
    }
    

})
//used in nutri to validate payments
router.get("/getDietRequest/:id", async(req,res) =>{
    try{
        let result = await dietRequest.findById(req.params.id)
        console.log(result)
        res.send(result)
    } catch (err) {
        console.log(err)
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

router.get("/updatePaidStatus/:id", async(req,res) =>{
    try{
        let id = req.params.id;
        let updatedRequest = await dietRequest.updateOne({_id: id},{ $set: { paid: "Yes" }} )
        console.log(updatedRequest)
        res.send(updatedRequest)
    } catch (err) {
        res.status(400).send({result: "error in catch" + err});
    }
    

})

router.get("/getDietDietRequest/:id/:nid", async(req, res) => {
    try{
        const userId = req.params.id;
        const nutId = req.params.nid
        const DietRequest = await dietRequest.findOne({ parentId: userId, nutritionId: nutId });
        console.log(DietRequest)
         res.send(DietRequest)
 
    }catch(err){
        res.status(400).send({result: err});
    }
    // router.get('/dietplans/:nutritionistId/:parentId', async (req, res) => {
    //     try {
    //       const { nutritionistId, parentId } = req.params;
      
    //       // check if both nutritionist and parent exist in database
    //       const nutritionist = await Nutritionist.findById(nutritionistId);
    //       const parent = await Parent.findById(parentId);
      
    //       if (!nutritionist || !parent) {
    //         return res.status(404).send({ message: 'Nutritionist or parent not found' });
    //       }
      
    //       // check if diet plan exists for the parent created by the nutritionist
    //       const dietRequest = await DietRequest.findOne({ nutritionistId, parentId });
      
    //       if (!dietRequest) {
    //         return res.status(404).send({ message: 'Diet plan not found for parent' });
    //       }
      
    //       // return diet plan to nutritionist
    //       return res.send(dietRequest.dietPlan);
      
    //     } catch (err) {
    //       console.error(err);
    //       return res.status(500).send({ message: 'Internal server error' });
    //     }
    //   });
      
})
module.exports=router;