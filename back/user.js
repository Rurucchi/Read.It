const express = require("express");
const router = express.Router();
const { usermodel, user } = require("./schema");
const bcrypt = require("bcrypt");
const { cryptoHash, cryptoCompare } = require("./crypto");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// DO NOT TOUCH

// routes

// app.get("/", (req, res) => {
//   let username = req.query.name;
//   return res.send(`username : ${username}`);
// });

// User search

router.post("/me", async (req, res) => {
  try {
    const userToken = req.headers.authorization;

    const userReturn = await usermodel.findOne({ "sessions.token": userToken });
    return res.status(200).send(userReturn.name);
  } catch (error) {
    console.log(error);
    res.status(404).send("User not found!");
  }
});

router.post("/signin", async (req, res) => {
  //create user
  const hash = await cryptoHash(req.body.password);

  const user = new usermodel({
    name: req.body.name,
    password: hash,
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

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const userExist = await usermodel.findOne({ name: req.body.user }).exec();

    if (!userExist) {
      return res.status(404).send({ message: "User not found" });
    }

    const passwordMatch = await cryptoCompare(
      req.body.password,
      userExist.password
    );

    console.log(passwordMatch);

    if (passwordMatch) {
      const jwtSecretKey = process.env.JWT_SECRET_KEY;
      let data = {
        time: Date.now(),
        userId: userExist.user,
      };

      const token = await jwt.sign(
        data,
        jwtSecretKey,
        { expiresIn: "30days" },
        userExist.name
      );

      return res
        .send({ message: "Successfully logged in!", token })
        .status(200);
    }

    return res.send({ message: "User not found!" }).status(400);
  } catch (error) {
    console.log(error);
  }
});

// ------------------ UPDATE

router.patch("/update", async (req, res) => {
  const userToken = req.headers.authorization;
  let filter;
  try {
    if (req.body.tochange === "name") {
      filter = { name: req.body.changeInput };
    } else if (req.body.tochange === "password") {
      const userPassword = cryptoHash(req.body.changeInput);
      filter = { password: userPassword };
    } else {
      return res.send("Bad request").status(400);
    }

    // Request to DB
    try {
      await usermodel.findOne({ "sessions.token": userToken });
      return res.send("Successfully Changed!").status(200);
    } catch (error) {
      res.status(404).send("User not found!");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

// DELETE

router.delete("/delete", async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    await usermodel.findOneAndDelete({ "sessions.token": userToken });

    return res.status(200).send("User successfully deleted!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
