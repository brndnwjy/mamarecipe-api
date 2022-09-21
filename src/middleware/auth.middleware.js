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

const isAdmin = (req, res, next) => {
  try {
    const {role} = req.decoded;
    if(role == 0){
      next()
    } else {
      res.json({
        message: "admin only"
      })
    }
  } catch (error) {
    console.log(error)
    next(createError(500, "internal server error"))
  }
};

module.exports = {
  jwtAuth,
  isAdmin,
};
