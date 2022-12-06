const express = require("express")
require('./db/config')
const user = require("./db/Schemas/Users")

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/" , (req, res) => {
    res.send("App is working")
})
app.get("/register" , async(req, res) =>{
    let User = new user(req.body)
    let result = await User.save()
    result = result.toObject();
   // delete result.password
   res.send(result)
})
app.post('/login', async (req, res) => {
    if (req.body.password && req.body.email) {
        let User = await user.findOne(req.body).select("-password");
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


