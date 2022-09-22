const express = require("express");
const router = express.Router();

const {
  getAll,
  getDetail,
  insertRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controller/recipe.controller");
const { jwtAuth } = require("../middleware/auth.middleware");
const removeImg = require("../middleware/delete.middleware");
const upload = require("../middleware/upload.middleware");

router
  .get("/", getAll)
  .get("/:id", getDetail)
  .post("/", jwtAuth, upload.single("photo"), insertRecipe)
  .put("/:id", removeImg, upload.single("photo"), updateRecipe)
  .delete("/:id", removeImg, deleteRecipe);

module.exports = router;
