const express = require("express")
const router=express.Router()
const dietRequest = require("../models/RequestDiet")
const Child = require('../models/ChildGrowth')
require('../config')
const verifyToken = require('../Middleware/auth')
router.post("/addchild", verifyToken, async (req, res) => {
    try {
        let childDetails = new Child(req.body)
        let result = await childDetails.save()
        result = result.toObject()
        res.send({result})
    } catch (err) {
        res.status(400).send("error in catch" + err);
    }

})
router.post("/addGrowthDetails/:id", async (req, res) => {
    try{
        let id = req.params.id
        const currentChild = await Child.findById(id)
        currentChild.trackParameters.push(req.body)
        const updatedChild = await Child.findByIdAndUpdate(id, currentChild, { new: true })
        res.send({updatedChild})
        console.log(id)
        console.log(req.body)
    }catch (err) {
        res.status(400).send({result: err});
    }
})
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
router.get("/getChilds/:id", verifyToken, async(req, res) => {
    try{
        let id = req.params.id;
        let result = await Child.find({parentId: id})
        if(result.length > 0){
            res.send(result)
        }else{
            res.send("Parent has no child")
            console.log("Parent has no child")
        }

    }catch(err){
        res.status(400).send("error in catch" + err);
    }
})

router.get("/getChildGrowthData/:id", verifyToken, async(req, res) => {
    try{
        let childId = req.params.id;
        let result = await Child.findById(childId)
        if(result.trackParameters.length > 0){
            res.send(result.trackParameters)
        }else{
            res.send("Child has no data")
            console.log("Child has no data")
        }

    }catch(err){
        res.status(400).send("error in catch" + err);
    }
})

router.post("/addGrowthDetails/:id", async (req, res) => {
    try{
        let id = req.params.id
        const currentChild = await Child.findById(id)
        currentChild.trackParameters.push(req.body)
        const updatedChild = await Child.findByIdAndUpdate(id, currentChild, { new: true })
        res.send({updatedChild})
    }catch (err) {
        res.status(400).send({result: err});
    }
})

router.get("/getBMI/:id", async (req, res) => {
    try{
        let id = req.params.id
        const currentChild = await Child.findById(id)
        if(currentChild.trackParameters.length > 0){
            res.send(currentChild.trackParameters)
        }else{
            res.send("No data found")
        }
    }catch (err) {
        res.status(400).send({result: err});
    }
})
module.exports=router;