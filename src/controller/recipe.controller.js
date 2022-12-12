const recipeModel = require("../model/recipe.model");
const { v4: uuidv4 } = require("uuid");
const createError = require("http-errors");
const response = require("../helper/response.helper");
const cloudinary = require("../helper/cloudinary");

const recipeController = {
  getAll: async (req, res, next) => {
    const search = req.query.search || "";
    const sortBy = req.query.sortby || "recipe_id";
    const sortOrder = req.query.order || "asc";

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const {
      rows: [count],
    } = await recipeModel.countFilterRecipe(search);
    const totalData = parseInt(count.total);
    const totalPage = Math.ceil(totalData / limit);

    const pagination = {
      currentPage: page,
      limit,
      totalData,
      totalPage,
    };

    recipeModel
      .getAll(search, sortBy, sortOrder, limit, offset)
      .then((result) => {
        response(res, result.rows, 200, "Get all recipes success", pagination);
      })
      .catch(() => {
        next(new createError.InternalServerError());
      });
  },

  getOwnRecipe: async (req, res, next) => {
    const { id } = req.decoded;

    const sortBy = req.query.sortby || "recipe_id";
    const sortOrder = req.query.order || "asc";

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const {
      rows: [count],
    } = await recipeModel.countRecipe();
    const totalData = parseInt(count.total);
    const totalPage = Math.ceil(totalData / limit);

    const pagination = {
      currentPage: page,
      limit,
      totalData,
      totalPage,
    };

    recipeModel
      .getOwnRecipe(id, sortBy, sortOrder, limit, offset)
      .then((result) => {
        response(res, result.rows, 200, "Get own recipes success", pagination);
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
        response(res, result.rows, 200, "Get recipe detail success");
      })
      .catch(() => {
        next(new createError.InternalServerError());
      });
  },

  insertRecipe: async (req, res, next) => {
    try {
      const { title, ingredient } = req.body;
      const { id: user_id } = req.decoded;
      const id = uuidv4();
      const date = new Date();
      let photo;

      console.log(req.decoded);

      if (req.file) {
        photo = await cloudinary.uploader.upload(req.file.path);
      }

      const data = {
        recipe_id: id,
        user_id,
        title,
        ingredient,
        file : photo.url,
        date,
      };

      console.log(data);

      recipeModel
        .insertRecipe(data)
        .then(() => {
          response(res, data, 200, `${title} recipe inserted`);
        })
        .catch((err) => {
          console.log(err);
          next(new createError.InternalServerError());
        });
    } catch (error) {
      console.log(error);
    }
  },

  updateRecipe: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { title, ingredient } = req.body;
      const date = new Date();
      let photo;

      if (req.file) {
        photo = await cloudinary.uploader.upload(req.file.path);
      }

      const data = {
        id,
        title,
        ingredient,
        file: photo.url,
        date,
      };

      recipeModel
        .updateRecipe(data)
        .then(() => {
          response(res, null, 200, "Recipe updated");
        })
        .catch(() => {
          next(new createError.InternalServerError());
        });
    } catch (error) {
      console.log(error);
    }
  },

  // localhost
  // insertRecipe: (req, res, next) => {
  //   const { title, ingredient } = req.body;
  //   const { id: user_id } = req.decoded;
  //   const id = uuidv4();
  //   const date = new Date();
  //   let photo;

  //   console.log(req.decoded)

  //   if (req.file) {
  //     photo = `http://${req.get("host")}/img/${req.file.filename}`;
  //   }

  //   const data = {
  //     recipe_id: id,
  //     user_id,
  //     title,
  //     ingredient,
  //     photo,
  //     date,
  //   };

  //   console.log(data)

  //   recipeModel
  //     .insertRecipe(data)
  //     .then(() => {
  //       response(res, data, 200, `${title} recipe inserted`);
  //     })
  //     .catch(() => {
  //       next(new createError.InternalServerError());
  //     });
  // },

  // updateRecipe: (req, res, next) => {
  //   const id = req.params.id;
  //   const { title, ingredient } = req.body;
  //   const date = new Date();
  //   let photo;

  //   if (req.file) {
  //     photo = `http://${req.get("host")}/img/${req.file.filename}`;
  //   }

  //   recipeModel
  //     .updateRecipe(id, title, ingredient, photo, date)
  //     .then(() => {
  //       response(res, null, 200, "Recipe updated");
  //     })
  //     .catch(() => {
  //       next(new createError.InternalServerError());
  //     });
  // },

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
        response(res, recipe, 200, "Recipe removed");
      })
      .catch(() => {
        next(new createError.InternalServerError());
      });
  },
};

module.exports = recipeController;
