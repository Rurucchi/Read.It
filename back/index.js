const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const cors = require("cors");

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

const usermodel = mongoose.model("username", user);

// routes

app.get("/", (req, res) => {
  let username = req.query.name;
  return res.send(`username : ${username}`);
});

app.post("/", async (req, res) => {
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

// do not touch
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
