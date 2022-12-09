const { unlink } = require("fs");
const path = require("path");
const { getDetail } = require("../model/recipe.model");

const recipeRemoveImg = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      rows: [recipe],
    } = await getDetail(id);

    if (recipe.photo) {
      const file = path.basename(recipe.photo);
      unlink(`./upload/recipe/${file}`, (err) => {
        if (err) {
          console.log(err);
          next();
        }
      });
    }
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = recipeRemoveImg;
