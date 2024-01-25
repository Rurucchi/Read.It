// SERVER STUFF
const express = require("express");
const router = express.Router();

// UTILS
const { v4: uuidv4 } = require("uuid");
const { getUserId } = require("./utils.js");

// MONGO STUFF
const { postModel, postScheme } = require("./schema");
const { userModel, user } = require("./schema");

// READ POST (note : dont forget about it)

router.get("/view/:postId", async (req, res) => {
  try {
    //query
    const query = await postModel.findOne({ postid: req.params.postId });

    const postReturn = {
      user: query.user,
      title: query.title,
      topic: query.topic,
      content: query.content,
      votes: query.votes,
      postid: query.postid,
      created: query.created,
    };

    return res.send(postReturn);
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

    const post = new postModel({
      user: user,
      title: req.body.title,
      topic: req.body.topic,
      created: Date.now(),
      content: req.body.content,
      embed: req.body.embed,
      votes: 0,
      postid: postid,
    });

    await post.save();
    return res.status(200).send({ postid: postid });
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

// --------- EDIT POST                 !!!!!!!!TO EDIT!!!!!!!!                   wip rn

router.patch("/edit/:postId", async (req, res) => {
  // changes enabled :
  // title
  // topic
  // content
  // embed

  // finding post

  let query;

  try {
    query = await postModel.findOne({ postid: req.params.postId }).exec();
  } catch (error) {
    return res.status(404).send("Post Not Found");
  }

  // CHECK USER AUTH AND ACCESS

  let userToken = req.headers.authorization;
  let user;
  try {
    user = await getUserId(userToken);
  } catch (error) {
    console.log(error);
    return res.status(401).send("Not logged in!");
  }

  // edit post
  try {
    console.log(user);
    console.log(req.params.postId);
    if (user === query.user) {
      query.title = req.body.title;
      query.topic = req.body.topic;
      query.content = req.body.content;
      query.embed = req.body.embed;

      //save
      await query.save();
      return res.status(200).send("Post successfully changed!");
    } else {
      res.status(401).send("You cannot edit this post.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// ---------- DELETE POST

router.delete("/delete/:postId", async (req, res) => {
  // POST
  let post;

  try {
    post = await postModel.findOne({ postid: req.params.postId }).exec();
  } catch (error) {
    return res.status(404).send("Post not found");
  }

  if (post === null) {
    return res.status(404).send("Post not found");
  }

  let user;

  try {
    user = await getUserId(req.headers.authorization);
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }

  if (user === post.user) {
    try {
      await postModel.findOneAndDelete({ postid: req.params.postId }).exec();
      return res.status(200).send("Post succesfully deleted!");
    } catch (error) {
      console.log(error);
      return res.status(404);
    }
  } else {
    return res.status(401).send("Unauthorized");
  }
});

module.exports = router;
