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
    const postReturn = await postModel.findOne({ postid: req.params.postId });
    console.log(req.params.postId);
    console.log(postReturn);
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

    const user = await getUserId(req.headers.authorization);
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

router.patch("/edit", async (req, res) => {
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

  // finding post

  let post;

  try {
    post = await postModel.findOne({ postid: req.body.postid }).exec();
  } catch (error) {
    res.status(404).send("Post Not Found");
  }

  // see if user is logged in

  let user;
  try {
    user = await getUserId(req.headers.authorization);
  } catch (error) {
    res.status(401).send("Unauthorized");
  }

  // CHECK USER
  try {
    if (user === post.user) {
      post.title = req.body.title;
      post.topic = req.body.topic;
      post.content = req.body.content;
      post.embed = req.body.embed;
      await post.save();
      return res.status(200).send("Post successfully changed!");
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// ---------- DELETE POST

router.delete("/delete", async (req, res) => {
  // POST
  let post;

  try {
    post = await postModel.findOne({ postid: req.body.postid }).exec();
  } catch (error) {
    res.status(404).send("Post Not Found");
  }

  let user;

  try {
    user = await getUserId(req.headers.authorization);
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }

  if (user === post.user) {
    try {
      await postModel.findOneAndDelete({ postid: req.body.postid }).exec();
      return res.status(200).send("Post succesfully deleted!");
    } catch (error) {
      console.log(error);
      return res.status(404);
    }
  } else {
    return res.status(401);
  }
});

module.exports = router;
