const express = require("express");
const nutriDetails = require("../models/NutritionDetails");
const router = express.Router();
const upload = require("./multer");
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

module.exports = router;
