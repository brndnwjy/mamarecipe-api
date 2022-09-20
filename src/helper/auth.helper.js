const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY_JWT);
  return token;
};

module.exports = generateToken;
