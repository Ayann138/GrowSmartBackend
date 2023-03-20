const express = require('express')
const User = require('../models/Users')
const router=express.Router()

router.get('/getAllUser' ,async (req,res) => {
    try{
        let users = await User.find()
        console.log(users)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

router.get('/RemoveUser/:id' ,async (req,res) => {
    try{
        let users = await User.findByIdAndDelete(req.params.id);
        res.send("User Removed")
        console.log("User Removed")
    }catch(err){
        console.log(err)
        res.send(err)
    }
})