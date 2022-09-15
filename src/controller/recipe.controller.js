const recipeModel = require("../model/recipe.model");

const recipeController = {
  getAll: (req, res) => {
    const search = req.query.search || "";
    const sortBy = req.query.sortby || "id";
    const sortOrder = req.query.order || "asc";

    recipeModel
      .getAll({ search, sortBy, sortOrder })
      .then((result) => {
        res.json(result.rows);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  getDetail: (req, res) => {
    const id = req.params.id;
    recipeModel
      .getDetail(id)
      .then((result) => {
        res.json(result.rows);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  insertRecipe: (req, res) => {
    const { title, ingredient, step } = req.body;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const timestamp = `${date} - ${time}`;
    recipeModel
      .insertRecipe(title, ingredient, step, timestamp)
      .then((result) => {
        res.json("Recipe Upload Success");
      })
      .catch((err) => {
        res.json(err);
      });
  },
  updateRecipe: (req, res) => {
    const id = req.params.id;
    const { title, ingredient, step } = req.body;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const timestamp = `${date} - ${time}`;
    recipeModel
      .updateRecipe(id, title, ingredient, step, timestamp)
      .then((result) => {
        res.json("Recipe Updated");
      })
      .catch((err) => {
        res.json(err);
      });
  },
  deleteRecipe: (req, res) => {
    const id = req.params.id;
    recipeModel
      .deleteRecipe(id)
      .then((result) => {
        res.json("Recipe Deleted");
      })
      .catch((err) => {
        res.json(err);
      });
  },
};

module.exports = recipeController;
