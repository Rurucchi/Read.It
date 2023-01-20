//Config
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const cors = require("cors");
const postRouter = require("./post");
const userRouter = require("./user");
const jwt = require("jsonwebtoken");
const { tokenLogin } = require("./utils.js");

// DISABLE MONGOOSE WARNING
mongoose.set("strictQuery", true);

app.use(express.json());
app.use(cors());

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ReadIt");
}

main().catch((err) => console.log(err));

// Middleware: logging
app.use((req, res, next) => {
  console.log(`Time: ${Date.now()} - ${req.method}: ${req.originalUrl}`);
  next();
});

// Routes
app.use("/post", tokenLogin, postRouter);
app.use("/user", userRouter);

// do not touch
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
