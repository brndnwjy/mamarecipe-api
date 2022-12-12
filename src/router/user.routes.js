const express = require("express");
const router = express.Router();

const {
  getDetail,
  register,
  login,
  deleteAccount,
  activation,
  updateAccount
} = require("../controller/user.controller");
const { jwtAuth } = require("../middleware/auth.middleware");
const upload = require("../middleware/userUpload.middleware");

router
  .get("/:id", getDetail)
  .get('/activate/:token/:id', activation)
  .post("/register", register)
  .post("/login", login)
  .put("/:id", jwtAuth, upload.single("avatar"), updateAccount)
  .delete("/:id", jwtAuth, deleteAccount);

module.exports = router;
