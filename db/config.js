const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/GrowSmart" ).then(
    () => console.log("Connection succesfully")
).catch((err) => console.log(err)) //Promise
