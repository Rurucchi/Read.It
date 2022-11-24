const { UserManager } = require("discord.js");
const express = require("express");
const router = express.Router();
const { postmodel, publication, user } = require("./schema");

// router.get("/hello", (req, res) => res.send("hello"));

// READ POST (note : dont forget about it)

router.get("/view/:postId", async (req, res) => {
  try {
    const postReturn = await postmodel.findOne({ _id: req.params.postId });
    return res.send({ postReturn });
  } catch (error) {
    console.log(error);
    res.status(404).send("Post not found!");
  }
});

// ------------ New post
router.post("/new", async (req, res) => {
  const post = new postmodel({
    user: req.body.user,
    title: req.body.title,
    topic: req.body.topic,
    create: req.body.date,
    content: req.body.content,
    embed: req.body.embed,
    votes: 0,
  });

  try {
    await post.save();
  } catch (error) {
    console.log(error);
  }

  return res.send("Post sent!");
});

// --------- PUT (EDIT) POST

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
    const post = await postmodel.findById("_" + req.body.id).exec();
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
    await postmodel.findByIdAndDelete("_" + req.query.id).exec();
  } catch (error) {
    console.log(error);
    res.status(404);
  }
  return res.status(200).send("Post successfully deleted!");
});

module.exports = router;
