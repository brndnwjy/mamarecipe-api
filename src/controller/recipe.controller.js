const recipeModel = require("../model/recipe.model");
const { v4: uuidv4 } = require("uuid");
const createError = require("http-errors");

const recipeController = {
  getAll: (req, res, next) => {
    const search = req.query.search || "";
    const sortBy = req.query.sortby || "recipe_id";
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
    const { id: user_id } = req.decoded;
    const id = uuidv4();
    const date = new Date();
    let photo;

    if (req.file) {
      photo = `http://${req.get("host")}/img/${req.file.filename}`;
    }

    recipeModel
      .insertRecipe(id, user_id, title, ingredient, photo, date)
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
    const date = new Date();
    let photo;

    if (req.file) {
      photo = `http://${req.get("host")}/img/${req.file.filename}`;
    }

    recipeModel
      .updateRecipe(id, title, ingredient, photo, date)
      .then(() => {
        res.json("Recipe Updated");
      })
      .catch(() => {
        next(new createError.InternalServerError());
      });
  },

  deleteRecipe: async (req, res, next) => {
    const id = req.params.id;
    let recipe;

    await recipeModel.getDetail(id).then((result) => {
      recipe = result.rows[0];
    });

    delete recipe.photo;
    delete recipe.video;

    recipeModel
      .deleteRecipe(id)
      .then(() => {
        res.json({
          message: "Recipe removed",
          recipe,
        });
      })
      .catch(() => {
        next(new createError.InternalServerError());
      });
  },
};

module.exports = recipeController;
