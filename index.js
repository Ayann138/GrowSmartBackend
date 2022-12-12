
const express = require("express")
const cors = require('cors')
require('./db/config')
const user = require("./db/Schemas/Users")
const query = require("./db/Schemas/Queries")
const auth = require("./db/Middleware/auth")
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
   // delete result.password
   res.send(result)
})
app.post("/addQuery" , async(req,res) =>{
    let Query = new query(req.body)
    let result = await Query.save()
    result = result.toObject()
    res.send(result)
})
app.get("/getQueries" , async(req,res) =>{
    let queries  = await query.find();
    if(queries.length > 0){
        res.send(queries)
    }else{
        res.send("No Product Found!!")
    }
})
app.post("/addComment" , async(req,res) =>{
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
app.get("/getComments/:id" , async(req,res) =>{
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
            res.send(User)
        }
        else {
            res.send({result: "User not found"})
        }
    }
    else {
        res.send("Provide Complete info")

    }

})

app.listen(8000)


