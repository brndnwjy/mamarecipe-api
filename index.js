require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const morgan = require("morgan");
const createError = require("http-errors");
const path = require("path");

const main = require("./src/router/index.routes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(xss());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/v1", main);

app.use("/img", express.static(path.join(__dirname, "/upload/recipe")));
app.use("/ava", express.static(path.join(__dirname, "/upload/user")));

app.all("*", (req, res, next) => {
  next(new createError.NotFound());
});

app.use((err, req, res) => {
  const msg = err.message || "Internal Server Error";
  const code = err.status || 500;

  res.status(code).json({
    message: msg
  });
});

app.listen(PORT, () => {
  console.log(`my life running on ${PORT}`);
});
