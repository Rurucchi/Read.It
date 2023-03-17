const { time } = require("discord.js");
const mongoose = require("mongoose");

// SCHEMES

const postScheme = mongoose.Schema({
  user: String,
  title: String,
  topic: String,
  content: String,
  embed: String,
  votes: Number,
  postid: String,
  created: Number,
});

const postHistoryScheme = mongoose.Schema({
  user: String,
  posts: Array,
});

const user = new mongoose.Schema({
  name: String,
  password: String,
  uid: String,
});

// MODELS (for DB)

const userModel = mongoose.model("user", user);

const postHistoryModel = mongoose.model("postHistory", postHistoryScheme);

const postModel = mongoose.model("post", postScheme);

// EXPORTS, DO NOT TOUCH UNLESS FULL-REFACTOR/NEW-FEATURE

module.exports = {
  postScheme,
  postModel,
  user,
  userModel,
  postHistoryScheme,
  postHistoryModel,
};
