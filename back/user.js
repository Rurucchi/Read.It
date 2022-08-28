const express = require("express");
const router = express.Router();
const { usermodel, user } = require("./schema");

// routes

// app.get("/", (req, res) => {
//   let username = req.query.name;
//   return res.send(`username : ${username}`);
// });

// User search

router.post("/signin", async (req, res) => {
  //create user

  const user = new usermodel({
    name: req.body.name,
    password: req.body.password,
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
    let doesMatch = await usermodel
      .find({ mail: req.body.mail, password: req.body.password })
      .exec();

    console.log(doesMatch);

    if (doesMatch.length > 0) {
      return res.send("Successfully logged in!");
    }

    return res.send("User not found!");
  } catch (error) {
    console.log(error);
  }
});

//UPDATE

router.post("/update", async (req, res) => {
  const { tochange, changeinput } = req.body;
  try {
    let doesMatch = await usermodel
      .find({ mail: req.body.mail, password: req.body.password })
      .exec();

    if (doesMatch.length > 0) {
      const { name, mail, password } = doesMatch[0];
      if (reqtochange === "name") {
        name = changeinput;
      } else if (tochange === "mail") {
        mail = changeinput;
      } else if (tochange === "password") {
        password = changeinput;
      } else {
        return res.send("Bad request");
      }
      await doesMatch[0].save();
      return res.send("Successfully Changed!");
    }

    return res.send("User not found!");
  } catch (error) {
    console.log(error);
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
