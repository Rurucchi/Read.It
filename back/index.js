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

// User search

app.post("/signin", async (req, res) => {
  //create user

  const user = new usermodel({
    name: req.body.name,
    password: req.body.password,
    mail: req.body.mail,
  });
  let username = req.body.name;

  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }

  //reply
  // console.log(req);

  return res.send(`created ${username}!`);
});

// READ

app.post("/login", async (req, res) => {
  try {
    let doesMatch = await usermodel
      .find({ mail: req.body.mail, password: req.body.password })
      .exec();

    console.log(doesMatch);

    if (doesMatch.length > 0) {
      return res.send("Successfully logged in!");
    }

    return res.send("User not found!");
  } catch (error) {
    console.log(error);
  }
});

//UPDATE

app.post("/update", async (req, res) => {
  try {
    let doesMatch = await usermodel
      .find({ mail: req.body.mail, password: req.body.password })
      .exec();

    if (doesMatch.length > 0) {
      if (req.body.tochange === "name") {
        doesMatch[0].name = req.body.changeinput;
        await doesMatch[0].save();
        return res.send("Successfully Changed!");
      } else if (req.body.tochange === "mail") {
        doesMatch[0].mail = req.body.changeinput;
        await doesMatch[0].save();
        return res.send("Successfully Changed!");
      } else if (req.body.tochange === "password") {
        doesMatch[0].password = req.body.changeinput;
        await doesMatch[0].save();
        return res.send("Successfully Changed!");
      } else {
        return res.send("Bad request");
      }
    }

    return res.send("User not found!");
  } catch (error) {
    console.log(error);
  }
});

// DELETE

app.post("/deleteuser", async (req, res) => {
  try {
    let doesMatch = await usermodel
      .find({ mail: req.body.mail, password: req.body.password })
      .exec();

    console.log(doesMatch);

    if (doesMatch.length > 0) {
      await usermodel.deleteOne({ mail: req.body.mail });
      return res.send("User successfully deleted!");
    }

    return res.send("User not found!");
  } catch (error) {
    console.log(error);
  }
});

// ----------------------------- Posts CRUD -----------------------------------

const publication = mongoose.Schema({
  id: String,
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
