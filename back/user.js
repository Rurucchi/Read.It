const express = require("express");
const router = express.Router();
const { usermodel, user } = require("./schema");
const bcrypt = require("bcrypt");
const { cryptoHash, cryptoCompare } = require("./crypto");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// routes

// app.get("/", (req, res) => {
//   let username = req.query.name;
//   return res.send(`username : ${username}`);
// });

// User search

router.get("/view/:userId", async (req, res) => {
  try {
    const userReturn = await usermodel.findOne({ _id: req.params.userId });
    return res.send(userReturn.name);
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

router.post("/login", async (req, res) => {
  try {
    let userVerif = await usermodel.findOne({ mail: req.body.mail }).exec();

    if (!userVerif) {
      return res.send("User not found!").status(400);
    }

    const passwordMatch = await cryptoCompare(
      req.body.password,
      userVerif.password
    );

    console.log(passwordMatch);

    if (passwordMatch) {
      const jwtSecretKey = process.env.JWT_SECRET_KEY;
      let data = {
        time: Date.now(),
        userId: userVerif.mail,
      };

      const token = await jwt.sign(data, jwtSecretKey, { expiresIn: "30days" });
      return res
        .send({ message: "Successfully logged in!", token })
        .status(200);
    }

    return res.send("User not found!").status(400);
  } catch (error) {
    console.log(error);
  }
});

// ------------------ UPDATE

router.post("/update", async (req, res) => {
  const { tochange, changeinput, mail, password } = req.body;

  try {
    const { name, mail, password } = doesMatch[0];
    if (tochange === "name") {
      name = changeinput;
    } else if (tochange === "mail") {
      mail = changeinput;
    } else if (tochange === "password") {
      password = changeinput;
    } else {
      return res.send("Bad request").status(400);
    }
    await doesMatch[0].save();
    return res.send("Successfully Changed!").status(200);
  } catch (error) {
    console.log(error);
    return res.send(error.message);
  }
});

// DELETE

router.post("/delete", async (req, res) => {
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

module.exports = router;
