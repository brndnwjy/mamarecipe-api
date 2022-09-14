const express = require("express");
const router = express.Router();

const {
  getAll,
  getDetail,
  insertRecipe,
  updateRecipe,
  deleteRecipe
} = require("../controller/recipe.controller");

router
  .get("/", getAll)
  .get("/:id", getDetail)
  .post("/", insertRecipe)
  .put("/:id", updateRecipe)
  .delete("/:id", deleteRecipe);

module.exports = router;
