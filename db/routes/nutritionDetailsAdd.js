const express = require("express");
const nutriDetails = require("../models/NutritionDetails");
const router = express.Router();
const upload = require("./multer");
router.get('/getAllNutritionDetails' , async(req,res)=>{
  try{
      let nutritionData = await nutriDetails.find();
      console.log(nutritionData)
      res.send(nutritionData)
  }catch(err){
      console.log(err)
      res.send(err)
  }
})
router.get('/showdetailsofcurrentnutriitonid/:id' , async(req,res)=>{
  try{
      let id = req.params.id
      let nutritionData = await nutriDetails.findOne({ nutritionId: id });
      console.log(nutritionData)
      res.send(nutritionData)
  }catch(err){
      console.log(err)
      res.send(err)
  }
})

router.put('/editNutritionDetails/:id' , async(req,res)=>{
  try{
      let id = req.params.id
      let nutritionData = await nutriDetails.findOne({ nutritionId: id });
      if(!nutritionData){
          res.status(404).send("Nutritionist not found")
      }
      else{
          let { nutritionName, email, phoneNo, fee, Education, Experience, Cnic, Resume, pic, approveStatus } = req.body;
          nutritionData.nutritionName = nutritionName;
          nutritionData.email = email;
          nutritionData.phoneNo = phoneNo;
          nutritionData.fee = fee;
          nutritionData.Education = Education;
          nutritionData.Experience = Experience;
          nutritionData.Cnic = Cnic;
          nutritionData.Resume = Resume;
          nutritionData.pic = pic;
          nutritionData.approveStatus = approveStatus;
          let result = await nutritionData.save();
          console.log(result);
          res.send(result);
      }
  }catch(err){
      console.log(err)
      res.send(err)
  }
})

router.post("/addDetails", upload.single("resume"), async (req, res) => {
  try {
    let nutritionId = req.body.nutritionId;
    let nutritionName = req.body.nutritionName;
    let Experience = req.body.Experience;
    let Education = req.body.Education;
    let Resume = req.file.path;
    let Cnic = req.body.Cnic;
    let email = req.body.email;
    let phoneNo = req.body.phoneNo;
    let approveStatus = req.body.approveStatus;
    let fee = req.body.fee;
    let pic = req.body.pic;

    let nutriDetail = new nutriDetails({
      nutritionId: nutritionId,
      nutritionName: nutritionName,
      Experience: Experience,
      Education: Education,
      Resume: Resume,
      Cnic: Cnic,
      email: email,
      phoneNo: phoneNo,
      approveStatus: approveStatus,
      pic: pic,
      fee: fee
    });
    let result = await nutriDetail.save();
    result = result.toObject();
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get('/getNutritionDetails/:id' , async(req,res)=>{
    try{
        let id = req.params.id
        let nutritionData = await nutriDetails.findOne({ nutritionId: id });
        console.log(nutritionData)
        res.send(nutritionData)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

router.get('/getAllNutritionDetails', async (req, res) => {
  try {
    let nutritionData = await nutriDetails.find({});
    console.log(nutritionData);
    res.send(nutritionData);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
