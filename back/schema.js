const mongoose = require("mongoose");

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

const user = new mongoose.Schema({
  name: String,
  password: String,
  mail: String,
});

const usermodel = mongoose.model("username", user);

module.exports = {
  publication,
  postmodel,
  user,
  usermodel,
};
