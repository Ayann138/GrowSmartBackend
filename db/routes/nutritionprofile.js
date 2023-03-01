const express = require("express")
const router=express.Router()
const verifyToken = require('../Middleware/auth')
const user = require("../models/Users")
const dietRequest = require("../models/RequestDiet")
router.get("/nutritionProfiles", verifyToken, async (req, res) => {
    try{
        let nutrition = await user.find({ role: "Nutrition" })
        res.send(nutrition)
    }catch (err) {
        res.status(400).send({result: err});
    }

})
router.get("/getDietRequests/:id", async(req,res) =>{
    try{
        let nid = req.params.id
        let result = await dietRequest.find({ nutritionId: nid })
        res.send(result)
    } catch (err) {
        res.status(400).send({result: "error in catch" + err});
    }
    

})
module.exports=router;