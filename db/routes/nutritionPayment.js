const express = require('express')
const router = express.Router();
const verifyToken = require("../Middleware/auth");
const Payment = require("../models/NutritionPayment");

router.post('/payment' ,verifyToken, async(req,res)=>{
    try {
        let newPayment = new Payment(req.body);
        let result = await newPayment.save();
        result = result.toObject();
        console.log("Paymenttttttt = " , result)
        res.send(result);
      } catch (err) {
        res.status(400).send({ result: err });
      } 
})
router.get("/viewPayment/:nutId", async (req, res) => {
    try {
      let payments = await Payment.find();
      if (payments.length > 0) {
       // console.log(Blogs)
        res.send(payments);

      } else {
        res.send("No Payment Receive!!");
      }
    } catch (err) {
      res.status(400).send({ result: err });
    }
  });


module.exports = router