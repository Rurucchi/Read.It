const tokenLogin = async (req, res, next) => {
  // console.log(req.aut);
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const rawToken = req.header("authorization");

    const token = rawToken.replace("Bearer ", "");

    // console.log(token);
    const verified = await jwt.verify(token, jwtSecretKey);

    console.log(verified);

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

module.exports = { tokenLogin };
