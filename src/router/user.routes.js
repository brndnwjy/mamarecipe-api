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
const { jwtAuth, isAdmin } = require("../middleware/auth.middleware");
const upload = require("../middleware/userUpload.middleware");
const removeImg = require("../middleware/userRemoveImg.middleware");

router
  .get("/", jwtAuth, isAdmin, getAll)
  .get("/:id", getDetail)
  .post("/signup", upload.single("avatar"), signUp)
  .post("/signin", signIn)
  .put("/:id", jwtAuth, removeImg, upload.single("avatar"), updateAccount)
  .delete("/:id", jwtAuth, removeImg, deleteAccount);

module.exports = router;
