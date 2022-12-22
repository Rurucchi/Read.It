const mongoose = require("mongoose");

const publication = mongoose.Schema({
  user: String,
  title: String,
  topic: String,
  content: String,
  embed: String,
  votes: String,
});

const postmodel = mongoose.model("post", publication);

const user = new mongoose.Schema({
  name: String,
  password: String,
});

const usermodel = mongoose.model("user", user);

module.exports = {
  publication,
  postmodel,
  user,
  usermodel,
};
