
const express = require("express")
const cors = require('cors')
require('./db/config')
const user = require("./db/Schemas/Users")
const query = require("./db/Schemas/Queries")
const Jwt = require("jsonwebtoken")
const jwtKey = "gwfyp"
const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/" , (req, res) => {
    res.send("App is working")
})
app.post("/register" , async(req, res) =>{
    let User = new user(req.body)
    let result = await User.save()
    result = result.toObject();
    if (result) {
        Jwt.sign({User},jwtKey,{expiresIn:"1min"},(err,token)=>{
            if(err){
                res.send({result: "Something went wrong!!!"})
            }
            res.send({result, auth: token})
        }) //(first mei jo data send krna hai wo ayy ga, second mei callback function)
    }
})
app.post("/addQuery" ,verifyToken, async(req,res) =>{
    let Query = new query(req.body)
    let result = await Query.save()
    result = result.toObject()
    res.send(result)
})
app.get("/getQueries" ,verifyToken, async(req,res) =>{
    let queries  = await query.find();
    if(queries.length > 0){
        res.send(queries)
    }else{
        res.send("No Product Found!!")
    }
})
app.post("/addComment" ,verifyToken, async(req,res) =>{
    let id = req.body.queryId
    let commentedBy = req.body.personName
    let commentText = req.body.comment
    console.log(id , commentText , commentedBy)

    const queryCurrent = await query.findById(id)
   // console.log(queryCurrent)
    queryCurrent.queryComment.push(req.body)
    //console.log(queryCurrent)
    const updatedQuery = await query.findByIdAndUpdate(id , queryCurrent , {new: true})
    //console.log(updatedQuery)
    res.send(updatedQuery)

})
app.get("/getComments/:id" ,verifyToken, async(req,res) =>{
    let id = req.params.id
   // console.log(id , "From get comments")
    const queryCurrent = await query.findById(id)
    if(queryCurrent.queryComment.length > 0){
        res.send(queryCurrent.queryComment)
    }else{
        console.log("Nooooo")
    }

})
app.post('/login', async (req, res) => {
    if (req.body.password && req.body.email) {
        let User = await user.findOne(req.body);
        if (User) {
            Jwt.sign({User},jwtKey,{expiresIn:"1hr"},(err,token)=>{
                if(err){
                    res.send({result: "Something went wrong!!!"})
                }
                res.send({User, auth: token})
            }) 
        }
        else {
            res.send({result: "User not found"})
        }
    }
    else {
        res.send("Provide Complete info")

    }

})
function verifyToken(req, res, next){
    let token = req.header('Authorization')
    if (token){
        Jwt.verify(token,jwtKey,(err, valid)=>{
            if(err){
                res.status(401).send({result: "Please enter valid token"})
                console.log("Please add valid token")

            }else[
                next()
            ]

        })
    }else{
        res.status(403).send({result: "Please add token"})
        console.log("Please add token")
    }
  //  console.log("Middleware called " , token)
}
app.listen(8000)


