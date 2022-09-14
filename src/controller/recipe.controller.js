const recipeModel = require("../model/recipe.model");

const recipeController = {
  getAll: (req, res) => {
    recipeModel
      .getAll()
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
    recipeModel
      .signUp(title, ingredient, step)
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
    const lastUpdate = new Date()
    recipeModel
      .updateAccount(id, title, ingredient, step, lastUpdate)
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
      .deleteAccount(id)
      .then((result) => {
        res.json("Recipe Deleted");
      })
      .catch((err) => {
        res.json(err);
      });
  },
};

module.exports = recipeController;
