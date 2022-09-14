const pool = require("../config/db");

const recipeModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM recipes", (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM recipes WHERE id = ${id}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  insertRecipe: (title, ingredient, step) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO recipes (title, ingredient, step, last_update)
            VALUES ('${title}', '${ingredient}', '${step}')`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  updateRecipe: (id, title, ingredient, step, lastUpdate) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `
            UPDATE recipes SET
            title = COALESCE('${title}', title),
            ingredient = COALESCE('${ingredient}', ingredient),
            step = COALESCE('${step}', step),
            last_update = COALESCE('${lastUpdate}', last_update)
            WHERE id = ${id}
            `,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  deleteRecipe: (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM recipes WHERE id = ${id};`, (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
      });
  },
};

module.exports = recipeModel;
