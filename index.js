const express = require("express")
const cors = require('cors')
const stripe=require('stripe')("sk_test_51Mj9rnCgjKRoygoHFoS8msjcqo5M8T6TPeAsJHC4KqpVWYWC53mIlMnkR1wkXld10uLv3s7SylFoJxRaRzMhfPfZ00pjWDIzGb")
var bodyParser = require('body-parser')
const uuid=require("uuid").v4
const userRouter=require ('./db/routes/user')
const addpost=require ('./db/routes/post')
const addnutpost=require ('./db/routes/guideline')
const nutritionProfiles=require ('./db/routes/nutritionprofile')
const Query=require ('./db/routes/query')
const Track=require ('./db/routes/track')
const NutritionDetails = require('./db/routes/nutritionDetailsAdd')
const approveRequests = require('./db/routes/adminApproveReq')
const admin = require('./db/routes/admin')
const foodItem = require('./db/routes/addFood')
const feedback = require('./db/routes/FeedBack')
const dietRequest = require('./db/routes/dietRequest')
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
app.use(admin)
app.use(foodItem)
app.use(feedback)
app.use(addnutpost)
app.use(dietRequest)
app.post('/checkout',async (req,res)=>{
    console.log("Request:",req.body);
    let error,status
    try {
      const {nut,token}=req.body
      const customer=await stripe.customers.create({
        email:token.email,
        source:token.id
      })
      const key=uuid()
      const charge = await stripe.charges.create({
        amount: nut.payment * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `paid the ${nut.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      });
      
      console.log("payment:",{charge});
      status="success";
    } 
    catch (error) {

      console.log("Error:",error)
      status="failure";
    }
    res.json({error,status});
})

app.listen(8000)