// SERVER STUFF
const express = require("express");
const router = express.Router();

// UTILS
const { v4: uuidv4 } = require("uuid");
const { getUserId, getTime } = require("./utils.js");

// MONGO STUFF
const { postModel, postScheme } = require("./schema");
const { userModel, user } = require("./schema");

// READ POST (note : dont forget about it)

router.get("/view/:postId", async (req, res) => {
  try {
    const postReturn = await postModel.findOne({ _id: req.params.postId });
    return res.send({ postReturn });
  } catch (error) {
    console.log(error);
    res.status(404).send("Post not found!");
  }
});

// ------------ New post
router.post("/new", async (req, res) => {
  try {
    const postid = uuidv4();

    const user = getUserId(req.headers.authorization);

    const time = getTime();

    const post = new postModel({
      user: user,
      title: req.body.title,
      topic: req.body.topic,
      create: time,
      content: req.body.content,
      embed: req.body.embed,
      votes: 0,
      postid: postid,
    });

    await post.save();
    return res.status(200).send("Post sent!");
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

// --------- EDIT POST                 !!!!!!!!TO EDIT!!!!!!!!

router.post("/edit", async (req, res) => {
  // changes enabled :
  // title
  // topic
  // content
  // embed

  // user: req.body.user,
  // title: req.body.title,
  // topic: req.body.topic,
  // create: req.body.date,
  // content: req.body.content,
  // embed: req.body.embed,

  try {
    const post = await postModel.findById("_" + req.body.id).exec();
    console.log(post);

    // changing values in db

    post.title = req.body.title;
    post.topic = req.body.topic;
    post.content = req.body.content;
    post.embed = req.body.embed;

    await post.save();
    return res.status(200).send("Post successfully changed!");
  } catch (error) {
    console.log(error);
  }
});

// ---------- DELETE POST

router.post("/delete", async (req, res) => {
  try {
    await postModel.findByIdAndDelete(req.query.id).exec();
  } catch (error) {
    console.log(error);
    res.status(404);
  }
  return res.status(200).send("Post successfully deleted!");
});

module.exports = router;
