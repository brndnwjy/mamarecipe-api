const recipeModel = require("../model/recipe.model");
const createError = require("http-errors");

const recipeController = {
  getAll: (req, res, next) => {
    const search = req.query.search || "";
    const sortBy = req.query.sortby || "id";
    const sortOrder = req.query.order || "asc";

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    recipeModel
      .getAll(search, sortBy, sortOrder, limit, offset)
      .then((result) => {
        res.json(result.rows);
      })
      .catch(() => {
        next(new createError.InternalServerError());
      });
  },

  getDetail: (req, res, next) => {
    const id = req.params.id;
    recipeModel
      .getDetail(id)
      .then((result) => {
        res.json(result.rows);
      })
      .catch(() => {
        next(new createError.InternalServerError());
      });
  },

  insertRecipe: (req, res, next) => {
    const { title, ingredient } = req.body;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const timestamp = `${date} - ${time}`;
    recipeModel
      .insertRecipe(title, ingredient, timestamp)
      .then(() => {
        res.json("Recipe Upload Success");
      })
      .catch(() => {
        next(new createError.InternalServerError());
      });
  },

  updateRecipe: (req, res, next) => {
    const id = req.params.id;
    const { title, ingredient } = req.body;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const timestamp = `${date} - ${time}`;
    recipeModel
      .updateRecipe(id, title, ingredient, timestamp)
      .then(() => {
        res.json("Recipe Updated");
      })
      .catch(() => {
        next(new createError.InternalServerError());
      });
  },
  
  deleteRecipe: (req, res, next) => {
    const id = req.params.id;
    recipeModel
      .deleteRecipe(id)
      .then(() => {
        res.json("Recipe Deleted");
      })
      .catch(() => {
        next(new createError.InternalServerError());
      });
  },
};

module.exports = recipeController;
