const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const cors = require("cors");
const { StringKeyframeTrack } = require("three");

app.use(express.json());
app.use(cors());

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ReadIt");
}

main().catch((err) => console.log(err));

const user = new mongoose.Schema({
  name: String,
  password: String,
  mail: String,
});

// ------------------------------------ User CRUD -------------------------------------------------

const usermodel = mongoose.model("username", user);

// routes

// app.get("/", (req, res) => {
//   let username = req.query.name;
//   return res.send(`username : ${username}`);
// });

app.post("/signin", async (req, res) => {
  //create user

  const user = new usermodel({
    name: req.body.username,
    password: req.body.password,
    mail: req.body.mail,
  });
  let username = req.body.name;

  try {
    // await usermodel.find({ name: name, age: { $gte: 18 } });
    await user.save();
  } catch (error) {
    console.log(error);
  }

  //reply
  // console.log(req);

  return res.send(`created ${username}!`);
});

app.get("/login", (req, res) => {
  const user = new usermodel({
    name: req.body.username,
    password: req.body.password,
    mail: req.body.mail,
  });

  try {
      user.findOne
    await user.save();
  } catch (error) {
    console.log(error);
  }
});

// ----------------------------- Posts CRUD -----------------------------------

const publication = mongoose.Schema({
  user: String,
  title: String,
  topic: String,
  create: String,
  content: String,
  embed: String,
  votes: String,
});

const postmodel = mongoose.model("post", publication);

app.post("/newpost", async (req, res) => {
  const post = new postmodel({
    id: req.body.id,
    user: req.body.user,
    title: req.body.title,
    topic: req.body.topic,
    create: req.body.date,
    content: req.body.content,
    embed: req.body.embed,
    votes: req.body.votes,
  });

  try {
    await post.save();
  } catch (error) {
    console.log(error);
  }

  return res.send("Post sent!");
});

// do not touch
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
