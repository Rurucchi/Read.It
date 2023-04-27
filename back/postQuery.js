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
      for (let i = 0; i < 3; i++) {
        let dbQuery = await postModel
          .findOne({
            title: { $regex: regex, $options: "i" },
            postid: !postFoundId.includes(),
          })
          .exec();
        console.log(dbQuery);
        postReturn.push(dbQuery);
        postFoundId.push(dbQuery.postid);
      }
    } catch (error) {
      console.log(error);
    }

    // return
    return res.status(200).send(postReturn);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

router.post("/exact/:query", async (req, res) => {});

module.exports = router;
