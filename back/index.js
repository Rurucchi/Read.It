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

app.use((req, res, next) => {
  // console.log(req.aut);
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const rawToken = req.header("authorization");

    // token = rawToken.replace("Bearer ", "");

    // console.log(token);
    const verified = jwt.verify(rawToken, jwtSecretKey);

    console.log(verified);

    if (verified) {
      req.user = verified;
    } else {
      // Access Denied
      return res.status(401).send(error);
    }
  } catch (error) {
    // Access Denied
    return res.status(401).send(error);
  }

  next();
});

// Routes
app.use("/post", postRouter);
app.use("/user", userRouter);

// do not touch
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
