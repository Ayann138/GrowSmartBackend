const Jwt = require("jsonwebtoken")
const jwtKey = "gwfyp"

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

export default verifyToken