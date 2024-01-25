// SERVER STUFF
const express = require("express");
const router = express.Router();

// UTILS
const { v4: uuidv4 } = require("uuid");
const { getUserId } = require("./utils.js");

// MONGO STUFF
const { postModel, postScheme } = require("./schema");
const { userModel, user } = require("./schema");

router.get("/:query", async (req, res) => {
  try {
    let query = req.params.query;
    query = query.toLowerCase();

    let postReturn = [];

    let regex = new RegExp(query);

    try {
      let postFoundId = [];

      // first request please dont crash
      // check if there are found posts already to prevent error
      let dbQuery;
      if (postFoundId.length > 0) {
        dbQuery = await postModel
          .find({
            title: { $regex: regex, $options: "i" },
            postid: !postFoundId.includes(),
          })
          .exec();
      } else {
        dbQuery = await postModel
          .find({
            title: { $regex: regex, $options: "i" },
          })
          .exec();
      }

      console.log(dbQuery);
      return res.status(200).send(dbQuery);
    } catch (error) {
      console.log(error);
      res.status(400).send("Bad Request");
    }

    // return
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

router.post("/exact/:query", async (req, res) => {});

module.exports = router;
