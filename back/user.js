// DO NOT TOUCH

// SERVER STUFF
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// CRYPTO STUFF
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { cryptoHash, cryptoCompare } = require("./crypto");

// UTILS
const { v4: uuidv4 } = require("uuid");

// MONGO MODELS AND DB STUFF
const { userModel, user } = require("./schema");

// ------------- User search

router.post("/me", async (req, res) => {
  try {
    if (req.headers.authorization) {
      if (
        !req.body.tochange === "name" ||
        !req.body.tochange === "password" ||
        req.headers.authorization === "Bearer undefined" ||
        req.headers.authorization === "Bearer " ||
        req.headers.authorization === undefined ||
        req.headers.authorization === ""
      ) {
        res.status(400).send("Not Logged In!");
      } else {
        //token parsing
        let token = req.headers.authorization;
        console.log(token);

        // jwt stuff
        const decoded = jwt.verify(token, jwtSecretKey);
        console.log(decoded);

        return res.status(200).send(decoded.username);
      }
    } else {
      res.status(400).send("Not Logged In!");
    }
  } catch (error) {
    console.log(error);
    res.status(501).send("Internal Server Error");
  }
});

// ---------------------- get user with id
router.get("/get/:id", async (req, res) => {
  try {
    const query = await userModel.findOne({ uid: req.params.id });
    return res.status(200).send({ user: query.name });
  } catch (error) {
    return res.status(404).send();
  }
});

// ---------------------- create user

router.post("/create", async (req, res) => {
  console.log(req.body.password);
  const hash = await cryptoHash(req.body.password);

  const uid = uuidv4();

  const user = new userModel({
    name: req.body.name,
    password: hash,
    uid: uid,
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

    // mongo call
    const userExist = await userModel.findOne({ name: req.body.name }).exec();

    if (!userExist) {
      return res.status(404).send({ message: "User not found" });
    }

    // compare passwords
    const passwordMatch = await cryptoCompare(
      req.body.password,
      userExist.password
    );

    // generate token
    let token;

    if (passwordMatch) {
      let data = {
        username: userExist.name,
        userId: userExist.uid,
      };

      token = await jwt.sign(data, jwtSecretKey, { expiresIn: "30days" });

      return res.status(200).send({ token: token });
    }

    return res.send({ message: "Wrong Credentials!" }).status(400);
  } catch (error) {
    console.log(error);
  }
});

// ------------------ UPDATE
router.patch("/update", async (req, res) => {
  try {
    const userToken = req.headers.authorization;

    // SEARCH USER IN MONGO

    try {
      // verify params
      if (
        !req.body.tochange === "name" ||
        !req.body.tochange === "password" ||
        req.headers.authorization === "Bearer undefined" ||
        req.headers.authorization === "Bearer " ||
        req.headers.authorization === undefined ||
        req.headers.authorization === ""
      ) {
        res.status(400).send("Bad Request");
      }

      // token parsing + params
      let token = req.headers.authorization;
      console.log(token);

      // jwt stuff
      const decoded = jwt.verify(token, jwtSecretKey);
      console.log(decoded);

      // mongo stuff
      let update;

      if (req.body.tochange === "password") {
        const newPassword = await cryptoHash(req.body.changeInput);
        console.log("PASSWORD : " + newPassword);
        update = { password: newPassword };
      } else {
        update = { name: req.body.changeInput };
      }

      const filter = { uid: decoded.userId };

      try {
        await userModel.findOneAndUpdate(filter, update);
        res.status(200).send("Successfuly changed!");
      } catch (error) {
        res.status(501).send("Internal Server Error");
      }
    } catch (error) {
      console.log(error);
      res.status(404).send("User not found!");
    }

    // Request to DB
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

// -------------------- DELETE

router.delete("/delete", async (req, res) => {
  try {
    let token = req.headers.authorization;
    let decoded;
    try {
      console.log(token);

      decoded = jwt.verify(token, jwtSecretKey);
      console.log(decoded);
    } catch (error) {
      return res.status(401).send("Unauthorized");
    }

    try {
      let success = await userModel.findOneAndDelete({ uid: decoded.userId });
      console.log(success);
      return res.status(200).send("User successfully deleted!");
    } catch (error) {
      return res.status(404).send("User does not exist");
    }
  } catch (error) {
    console.log(error);
    return res.status(501).send("Internal server error");
  }
});

module.exports = router;
