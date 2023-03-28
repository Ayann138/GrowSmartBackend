const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/auth");
const query = require("../models/Queries");
var Filter = require("bad-words"),
  filter = new Filter();
filter.addWords("bullshit");
router.post("/addQuery", async (req, res) => {
  let count = 0;
  var queryContent = filter.clean(req.body.queryContent);
  for (let i = 0; i < queryContent.length; i++) {
    if (queryContent[i] == "*") {
      count += 1;
    }
  }
  if (count == 0) {
    try {
      let Query = new query(req.body);

      let result = await Query.save();
      result = result.toObject();
      res.send(result);
    } catch (err) {
      res.status(400).send({ result: err });
    }
  } else {
    console.log("Query contains impropriate words");
    res.send("Query contains impropriate words");
  }
});
router.get("/getQueries", verifyToken, async (req, res) => {
  try {
    let queries = await query.find();
    if (queries.length > 0) {
      res.send(queries);
    } else {
      res.send("No Query Found!!");
    }
  } catch (err) {
    res.status(400).send({ result: err });
  }
});
router.get("/deleteQuery/:id", verifyToken, async (req, res) => {
  try {
    const query = await query.findByIdAndDelete(req.params.id);
    res.send("Query Deleted");
  } catch (err) {
    res.status(401).send(err);
  }
});
router.get("/getProfileQueries/:id", verifyToken, async (req, res) => {
  try {
    let id = req.params.id;
    let Queries = await query.find({ parentId: id });
    if (Queries.length > 0) {
      res.send(Queries);
    } else {
      res.send("Share posts first!!");
    }
  } catch (err) {
    res.status(400).send({ result: err });
  }
});
router.post("/addComment", verifyToken, async (req, res) => {
  try {
    let id = req.body.queryId;
    const queryCurrent = await query.findById(id);
    queryCurrent.queryComment.push(req.body);
    const updatedQuery = await query.findByIdAndUpdate(id, queryCurrent, {
      new: true,
    });
    res.send(updatedQuery);
  } catch (err) {
    res.status(400).send({ result: err });
  }
});
router.get("/getComments/:id", verifyToken, async (req, res) => {
  try {
    let id = req.params.id;
    // console.log(id , "From get comments")
    const queryCurrent = await query.findById(id);
    if (queryCurrent.queryComment.length > 0) {
      res.send(queryCurrent.queryComment);
    } else {
      res.send("Nooooo");
    }
  } catch (err) {
    res.status(400).send({ result: err });
  }
});

router.post("/addlike/:id", verifyToken, async (req, res) => {
  try {
    let id = req.params.id;
    const queryCurrent = await query.findById(id);
    queryCurrent.queryLikeS.push(req.body);
    const updatedQuery = await query.findByIdAndUpdate(id, queryCurrent, {
      new: true,
    });
    res.send({ updatedQuery });
  } catch (err) {
    res.status(400).send({ result: err });
  }
});
router.post("/like/:id", async (req, res) => {
  try {
    const queryCurrent = await query.findById(req.params.id);
    if (!queryCurrent) {
      return res.status(404).json({ message: "Query not found" });
    }

    //Check if the query has already been liked by the user
    const alreadyLiked = queryCurrent.queryLikeS.some(
      (like) => like.likedById === req.body.likedById
    );

    if (alreadyLiked) {
      return res
        .status(400)
        .json({ message: "Query already liked by this user" });
    }

    // Add new like to the queryLikeS array
    queryCurrent.queryLikeS.push({
      likedBy: req.body.likedBy,
      likedById: req.body.likedById,
    });

    await queryCurrent.save();
    res.json(queryCurrent);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
router.delete('/like/:id/:likedById', async (req, res) => {
    const { queryId, likedById } = req.params;
  
    try {
      // Find the query by its ID
      const Query = await query.findById(queryId);
  
      if (!Query) {
        return res.status(404).json({ message: 'Query not found' });
      }
  
      // Remove the like from the query's array of likes
      const updatedQuery = Query.queryLikeS.filter(like => like.likedById !== likedById);
  
      // Update the query in the database
      const savedQuery = await query.updateOne({ queryLikeS: updatedQuery });
  
      // Return the updated query as the response
      res.status(200).json(savedQuery);
    } catch (err) {
      // Handle any errors that occur
      res.status(500).json({ message: err.message });
    }
  });
module.exports = router;
