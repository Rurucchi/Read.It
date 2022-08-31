const bcrypt = require("bcrypt");

async function cryptoHash(password) {
  const saltRounds = 10;
  const cryptPassword = await bcrypt.hash(password, saltRounds);
  return cryptPassword;
}

async function cryptoCompare(InputPassword, DbPassword) {
  const match = await bcrypt.compare(InputPassword, DbPassword);
  return match;
}

module.exports = { cryptoHash, cryptoCompare };
