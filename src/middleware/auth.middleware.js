const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const jwtAuth = (req, res, next) => {
  try {
    if (req.headers.token) {
      const { token } = req.headers;
      const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);

      req.decoded = decoded;
      next();
    } else {
      res.json({
        message: "token not found",
      });
    }
  } catch (error) {
    console.log(error);
    if (error.name === "JsonWebTokenError") {
      next(createError(400, "token is invalid"));
    } else if (error.name === "TokenExpiredError") {
      next(createError(400, "token is expired"));
    } else {
      next(createError(400, "error occured"));
    }
  }
};

module.exports = jwtAuth;
