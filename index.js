const express = require("express")
const cors = require('cors')
var bodyParser = require('body-parser')
const userRouter=require ('./db/routes/user')
const addpost=require ('./db/routes/post')
const nutritionProfiles=require ('./db/routes/nutritionprofile')
const Query=require ('./db/routes/query')
const Track=require ('./db/routes/track')
const NutritionDetails = require('./db/routes/nutritionDetailsAdd')
const approveRequests = require('./db/routes/adminApproveReq')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/images',express.static('images'));
app.use(userRouter);
app.use(addpost);
app.use(nutritionProfiles);
app.use(Query);
app.use(Track);
app.use(NutritionDetails)
app.use(approveRequests)
app.listen(8000)