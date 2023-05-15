const express = require('express')
const foodItems = require('../models/foodItems')
const dietPlan = require('../models/DietPlan')
const DietReceive = require('../models/DietPlan');
const DietRequest = require("../models/RequestDiet");
const User = require("../models/Users");
const router  = express.Router();

router.post('/addFood', async(req, res) => {
    try{
        let foodItem = new foodItems(req.body);
        let result = await foodItem.save();
        result = result.toObject()
        console.log(result)
        res.send(result)
    }catch{
        res.status(400).send({result: err});
    }
})

router.get('/getFoodItem', async(req, res) => {
    try{
        let fItems = await foodItems.find();
        if (fItems.length > 0) {
            res.send(fItems)
            console.log(fItems)
        } else {
            res.send("No Post Found!!")
        }
    }catch (err) {
        res.status(400).send({result: err});
    }
})

router.post('/addFoodItem', async(req, res) => {
    try{
        let dietplan = new dietPlan(req.body)
        let result = await dietplan.save()
        result = result.toObject()
        console.log(result)
        res.send(result)
    }catch (err) {
        res.status(400).send({result: err});
    }
})

router.post('/addFoodItem/:id', async(req, res) => {
    try{
        let id = req.params.id
        let current = await dietPlan.findById(req.params.id)
        current.foodItem.push(req.body)
        const result = await dietPlan.findByIdAndUpdate(id , current, { new: true })
        res.send(result)

    }catch (err) {
        res.status(400).send({result: err});
    }
})

router.get('/getDietPlan/:id/:nid', async(req, res) => {
    try{
        const userId = req.params.id;
        const nutId = req.params.nid
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }

          const dietRequest = await DietRequest.findOne({ parentId: userId, nutritionId: nutId });
          if (!dietRequest) {
            return res.status(404).json({ error: 'User has no dietRequest' });
          }
          
          const dietReceive = await DietReceive.findOne({ dietRequestId: dietRequest._id });
          console.log(dietReceive)
          console.log("-----------------------------------------------------------------------------------------")
          res.send(dietReceive)
 
    }catch(err){
        res.status(400).send({result: err});
    }
})
router.get('/getDietPlan/:nutId/:parentId', async(req, res) => {
    try{
        const nutId = req.params.nutId;
        const parentId = req.params.parentId;
        
        const dietRequest = await DietRequest.findOne({ parentId: parentId, nutritionId: nutId });
        if (!dietRequest) {
            return res.status(404).json({ error: 'User has no dietRequest' });
        }
          
        const dietReceive = await DietReceive.findOne({ dietRequestId: dietRequest._id });
        console.log(dietReceive)
        console.log("-----------------------------------------------------------------------------------------")
        res.send(dietReceive)
 
    }catch(err){
        res.status(400).send({result: err});
    }
})

router.get('/getgetfoodItemsId/:id' , async(req,res) => {
    try{
        let id = req.params.id;
        const Current = await DietReceive.findById(id);
        if (Current.foodItem.length > 0) {
          res.send(Current.foodItem);
          console.log("Id: ",Current.foodItem)
        } else {
          res.send("Nooooo");
        }
    }catch(err){
        res.status(400).send({result: err});
    }
})
module.exports = router;