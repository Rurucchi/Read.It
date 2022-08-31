const express = require("express");
const router = express.Router();
const { postmodel, publication } = require("./schema");

// router.get("/hello", (req, res) => res.send("hello"));

router.post("/new", async (req, res) => {
  const post = new postmodel({
    user: req.body.user,
    title: req.body.title,
    topic: req.body.topic,
    create: req.body.date,
    content: req.body.content,
    embed: req.body.embed,
    votes: req.body.votes,
    // TODO : edit votes system : request breaks the vote system
    //
    // TODO : edit usersytem : implement token to fetch and secure the thing
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

  // TODO : when implemented, match user token in request and in database to guarantee security

  try {
    const post = await postmodel.findById(req.body.id).exec();
    console.log(post);

    // changing values in db

    post.title = req.body.title;
    post.topic = req.body.topic;
    post.content = req.body.content;
    post.embed = req.body.embed;

    await post.save();
  } catch (error) {
    console.log(error);
  }

  return res.send("Post successfully changed!");
});

// ---------- DELETE POST

router.post("/delete", async (req, res) => {
  try {
    await postmodel.findByIdAndDelete(req.query.id).exec();
  } catch (error) {
    console.log(error);
  }
  return res.status(200).send("Post successfully deleted!");
});

module.exports = router;
