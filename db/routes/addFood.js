const express = require('express')
const foodItems = require('../models/foodItems')
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
module.exports = router;