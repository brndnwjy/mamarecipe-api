const express = require("express");
const router = express.Router();

const {
  getAll,
  getDetail,
  signUp,
  signIn,
  updateAccount,
  deleteAccount,
} = require("../controller/user.controller");

router
  .get("/", getAll)
  .get("/:id", getDetail)
  .post("/signup", signUp)
  .post("/signin", signIn)
  .put("/:id", updateAccount)
  .delete("/:id", deleteAccount);

module.exports = router;
