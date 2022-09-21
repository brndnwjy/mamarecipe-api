const express = require("express");
const router = express.Router();

const {
  getAll,
  getDetail,
  insertRecipe,
  updateRecipe,
  deleteRecipe
} = require("../controller/recipe.controller");
const { jwtAuth } = require("../middleware/auth.middleware");

router
  .get("/", getAll)
  .get("/:id", getDetail)
  .post("/", jwtAuth, insertRecipe)
  .put("/:id", updateRecipe)
  .delete("/:id", deleteRecipe)

module.exports = router;
