const express = require("express")
const router=express.Router()
router.use('/images',express.static('images'))
const bcrypt = require("bcrypt")
const { passwordStrength } = require('check-password-strength')
const user = require("../models/Users")
const Jwt = require("jsonwebtoken")
const jwtKey = "gwfyp"
require('../config')
const upload = require('./multer')
const verifyToken = require("../Middleware/auth")


router.get("/", (req, res) => {
    res.send("App is working")
})
router.post("/register",upload.single("profilePic"), async (req, res) => {
    try{
        const name = req.body.name;
        const email = req.body.email;
        const role = req.body.role;
        const phone = req.body.phone;
        const profilePic = req.file.path;
        const Upass = req.body.password
        console.log(passwordStrength(Upass).value)
        if(passwordStrength(Upass).value == "Weak" || passwordStrength(Upass).value == "Too weak"){
            res.send({ result: `Password is ${passwordStrength(Upass).value}` })
            console.log(`Password is ${passwordStrength(Upass).value}`)
        }else{
            let User = new user({name: name, email: email, role: role, phone: phone, password: Upass, profilePic: profilePic})
            let result = await User.save()
            console.log(`Password is ${passwordStrength(Upass).value}`)
            result = result.toObject();
            if (result) {
                Jwt.sign({ User }, jwtKey, { expiresIn: "5hr" }, (err, token) => {
                    if (err) {
                        res.send({ result: "Something went wrong!!!" })
                    }
                    console.log(result)
                    res.send({ result, auth: token })
                }) //(first mei jo data send krna hai wo ayy ga, second mei callback function)
            }else{
                res.send({ result: "Something went wrong!!!" })
                console.log("Something went wrong!!!")
            }
        }

    }catch (err) {
        res.status(400).send({result: err});
    }
})
router.post("/changePassword/:id", async (req, res) => {
    try{
        let id = req.params.id
        let data = await user.findById(id)
        let pass = req.body.password
        let cpass = req.body.cpassword
        let newPass = req.body.newPass
        console.log(data)
        if (cpass == pass) {
            if (pass == data.password) {
                data.password = newPass
                let result = await data.save()
                res.send("Password Updated")
            }
            else {
                res.send("Incorrect Password")
            }
        } else {
            res.send("Pass and Cpass doen not match")
        }

    }catch (err) {
        res.status(400).send({result: err});
    }
})
router.get('/getUserOfComment/:name/:stars' ,verifyToken, async(req,res) =>{
    try{
        let userName = req.params.name
        let result = await user.find({name: userName})
        let id = result[0]._id
        const stars = parseInt(req.params.stars, 10) || 0; 
        const rev = parseInt(result[0].reviews , 10) || 0; 
        console.log(result[0].rating + stars)
        const newRating = result[0].rating + stars
        const newReviews = rev + 1
        let updatedRating = await user.updateOne({_id: id},{ $set: { rating: newRating, reviews: newReviews }} )
        console.log(updatedRating)
        res.send({updatedRating})
    }catch(err){
        console.log(err)
        res.send(err)
    }
})
// GET user by ID
router.get('/users/:id', async (req, res) => {
    try {
      const User = await user.findById(req.params.id);
      if (!User) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.send(User);
    } catch (err) {
      res.status(500).send({ message: 'Server error' });
    }
  });
  
router.post('/login', async (req, res) => {
    try {
        const Upass = req.body.password;
        const Uemail = req.body.email;
        if (Upass && Uemail) {
            let User = await user.findOne({ email: Uemail });
            if (User) {
                const isMatch = await bcrypt.compare(Upass, User.password)
                if (isMatch) {
                    Jwt.sign({ User }, jwtKey, { expiresIn: "5hr" }, (err, token) => {
                        if (err) {
                            res.send({ result: "Something went wrong!!!" })
                        }
                        res.send({ User, auth: token })
                    })
                }
                else {
                    res.send({ result: "User not found" })
                }
            }
            else {
                res.send({ result: "User not found" })
            }
        }
        else {
            res.send("Provide Complete info")

        }
    } catch (err) {
        res.status(400).send("error in catch" + err);
    }
})
module.exports=router;