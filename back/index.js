//Config
const dotenv = require("dotenv");
dotenv.config();

// server stuff needed
const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const cors = require("cors");

// define routes
const postRouter = require("./post");
const userRouter = require("./user");
const queryRouter = require("./postQuery");

// utils and jwt
const jwt = require("jsonwebtoken");
const { tokenLogin } = require("./utils.js");

// DISABLE MONGOOSE WARNING
mongoose.set("strictQuery", true);

app.use(express.json());
app.use(cors());

async function main() {
  await mongoose.connect(process.env.MONGOURL);
}

main().catch((err) => console.log(err));

// Middleware: logging
app.use((req, res, next) => {
  console.log(`Time: ${Date.now()} - ${req.method}: ${req.originalUrl}`);
  next();
});

// Routes
app.use("/post", tokenLogin, postRouter, cors());
app.use("/user", userRouter, cors());
app.use("/search", queryRouter, cors());

// do not touch
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
