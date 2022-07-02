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

// app.get("/login", async (req, res) => {
//   const user = new usermodel({
//     name: req.body.username,
//     password: req.body.password,
//     mail: req.body.mail,
//   });

//   try {
//       // user.findOne();
//     await user.save();
//   } catch (error) {
//     console.log(error);
//   }
// });

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

// ------------- READ POST
app.get("/post/:id", async (req, res) => {
  let post;

  try {
    post = await postmodel.findById(req.params.id).exec();
    return res.send(post);
  } catch (error) {
    console.log(error);
    return res.send("query unsucessfull!!!!");
  }
});

// ------------- CREATE POST

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

app.put("/postedit", async (req, res) => {
  // changes enabled :
  // title
  // topic
  // content
  // embed

  // id: req.body.id,
  // user: req.body.user,
  // title: req.body.title,
  // topic: req.body.topic,
  // create: req.body.date,
  // content: req.body.content,
  // embed: req.body.embed,
  // votes: req.body.votes,

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

app.delete("/postdelete", async (req, res) => {
  try {
    await postmodel.findByIdAndDelete(req.query.id).exec();
  } catch (error) {
    console.log(error);
  }
  return res.status(200).send("Post successfully deleted!");
});

// do not touch
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
