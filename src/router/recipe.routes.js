const express = require("express");
const router = express.Router();

const {
  getAll,
  getOwnRecipe,
  getDetail,
  insertRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controller/recipe.controller");
const { jwtAuth } = require("../middleware/auth.middleware");
const upload = require("../middleware/recipeUpload.middleware");

router
  .get("/", getAll)
  .get("/myrecipe", jwtAuth, getOwnRecipe)
  .get("/:id", getDetail)
  .post("/",  jwtAuth, upload.single("photo"), insertRecipe)
  .put("/:id", jwtAuth, upload.single("photo"), updateRecipe)
  .delete("/:id", jwtAuth, deleteRecipe);

module.exports = router;
