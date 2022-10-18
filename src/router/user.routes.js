const express = require("express");
const router = express.Router();

const {
  getDetail,
  register,
  login,
  updateAvatar,
  // updateAccount,
  deleteAccount,
  activation
} = require("../controller/user.controller");
const { jwtAuth } = require("../middleware/auth.middleware");
const upload = require("../middleware/userUpload.middleware");
const removeImg = require("../middleware/userRemoveImg.middleware");

router
  .get("/:id", getDetail)
  .get('/activate/:token/:id', activation)
  .post("/register", register)
  .post("/login", login)
  .put("/:id", jwtAuth, upload.single("avatar"), updateAvatar)
  // .put("/:id", jwtAuth, upload.single("avatar"), updateAccount)
  .delete("/:id", jwtAuth, removeImg, deleteAccount);

module.exports = router;
