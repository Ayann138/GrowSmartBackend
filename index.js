
const express = require("express")
const cors = require('cors')
const bcrypt = require("bcrypt")
const multer = require('multer')
require('./db/config')
const user = require("./db/Schemas/Users")
const query = require("./db/Schemas/Queries")
const dietRequest = require("./db/Schemas/RequestDiet")
const Child = require('./db/Schemas/ChildGrowth')
const Jwt = require("jsonwebtoken")
const { request } = require("express")
const jwtKey = "gwfyp"
const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })


app.get("/", (req, res) => {
    res.send("App is working")
})
app.post("/register", async (req, res) => {
    try{
        let User = new user(req.body)
        let result = await User.save()
        result = result.toObject();
        if (result) {
            Jwt.sign({ User }, jwtKey, { expiresIn: "5hr" }, (err, token) => {
                if (err) {
                    res.send({ result: "Something went wrong!!!" })
                }
                res.send({ result, auth: token })
            }) //(first mei jo data send krna hai wo ayy ga, second mei callback function)
        }
    }catch (err) {
        res.status(400).send({result: err});
    }
})
app.post("/changePassword/:id", async (req, res) => {
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
app.get("/nutritionProfiles", verifyToken, async (req, res) => {
    try{
        let nutrition = await user.find({ role: "Nutrition" })
        res.send(nutrition)
    }catch (err) {
        res.status(400).send({result: err});
    }

})

app.post("/addQuery", async (req, res) => {
    try{
        let Query = new query(req.body)
        let result = await Query.save()
        result = result.toObject()
        res.send(result)
    }catch (err) {
        res.status(400).send({result: err});
    }
})
app.get("/getQueries", verifyToken, async (req, res) => {
    try{
        let queries = await query.find();
        if (queries.length > 0) {
            res.send(queries)
        } else {
            res.send("No Product Found!!")
        }
    }catch (err) {
        res.status(400).send({result: err});
    }
})

app.post("/addComment", verifyToken, async (req, res) => {
    try{
        let id = req.body.queryId
        const queryCurrent = await query.findById(id)
        queryCurrent.queryComment.push(req.body)
        const updatedQuery = await query.findByIdAndUpdate(id, queryCurrent, { new: true })
        res.send(updatedQuery)
    }catch (err) {
        res.status(400).send({result: err});
    }

})
app.get("/getComments/:id", verifyToken, async (req, res) => {
    try{
        let id = req.params.id
        // console.log(id , "From get comments")
        const queryCurrent = await query.findById(id)
        if (queryCurrent.queryComment.length > 0) {
            res.send(queryCurrent.queryComment)
        } else {
            res.send("Nooooo")
        }
    }catch (err) {
        res.status(400).send({result: err});
    }
})

app.post("/addlike/:id", verifyToken, async (req, res) => {
    try{
        let id = req.params.id
        const queryCurrent = await query.findById(id)
        queryCurrent.queryLikeS.push(req.body)
        const updatedQuery = await query.findByIdAndUpdate(id, queryCurrent, { new: true })
        res.send({updatedQuery})
    }catch (err) {
        res.status(400).send({result: err});
    }

})

app.post("/removelike/:id", verifyToken, async (req, res) => {
    try{
        let id = req.body.queryId
        const queryCurrent = await query.findById(id)
        queryCurrent.queryLikes.pull(req.body)
        const updatedQuery = await query.findByIdAndUpdate(id, queryCurrent, { new: true })
        res.send({updatedQuery})
    }catch (err) {
        res.status(400).send({result: err});
    }

})
app.post("/addchild", verifyToken, async (req, res) => {
    try {
        let childDetails = new Child(req.body)
        let result = await childDetails.save()
        result = result.toObject()
        res.send({result})
    } catch (err) {
        res.status(400).send("error in catch" + err);
    }

})
app.post("/addGrowthDetails/:id", async (req, res) => {
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
app.post("/addDietRequest", verifyToken, async (req, res) => {
    try{
        let dietReq = new dietRequest(req.body)
        let result = await dietReq.save()
        res.send({result: res})
    } catch (err) {
        res.status(400).send({result: "error in catch" + err});
    }
    
})
app.get("/getDietRequests/:id", async(req,res) =>{
    try{
        let nid = req.params.id
        let res = await dietRequest.find({ nutritionId: nid })
        res.send({result: res})
    } catch (err) {
        res.status(400).send({result: "error in catch" + err});
    }
    

})
app.post('/login', async (req, res) => {
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
function verifyToken(req, res, next) {
    let token = req.header('Authorization')
    if (token) {
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "Please enter valid token" })
                console.log("Please add valid token")

            } else[
                next()
            ]

        })
    } else {
        res.status(403).send({ result: "Please add token" })
        console.log("Please add token")
    }
    //  console.log("Middleware called " , token)
}
app.listen(8000)


