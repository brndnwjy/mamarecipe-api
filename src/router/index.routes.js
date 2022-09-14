const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes");
const recipeRoutes = require("./recipe.routes");

router.use("/user", userRoutes).use("/recipe", recipeRoutes);

module.exports = router;
