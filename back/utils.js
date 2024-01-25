const jwt = require("jsonwebtoken");

//  jwt imports
const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// Models
const { userModel, user } = require("./schema");

// TOKEN LOGIN
const tokenLogin = async (req, res, next) => {
  // console.log(req.aut);

  try {
    const rawToken = req.headers.authorization;
    console.log(rawToken);

    const reg = new RegExp("Bearer ");
    let token;
    if (reg.test(rawToken)) {
      token = rawToken.replace("Bearer ", "");
    } else {
      token = rawToken;
    }

    // console.log(token);
    const verified = await jwt.verify(token, jwtSecretKey);

    if (verified) {
      req.user = verified; // req.user includes verified
    } else {
      // Access Denied
      return res.status(401).send(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send(error);
  }

  next();
};

// USER VERIF & USER RELATED STUFF

function getUserId(userToken) {
  const decoded = jwt.verify(userToken, jwtSecretKey);

  return decoded.userId;
}

// OTHER FUNCTIONS

module.exports = { tokenLogin, getUserId };
