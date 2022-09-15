const pool = require("../config/db");

const recipeModel = {
  getAll: ({ search, sortBy, sortOrder }) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM recipes WHERE title ILIKE '%${search}%' ORDER BY ${sortBy} ${sortOrder}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
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
  insertRecipe: (title, ingredient, step, timestamp) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO recipes (title, ingredient, step, created_at)
            VALUES ($1, $2, $3, $4)`,
        [title, ingredient, step, timestamp],
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  updateRecipe: (id, title, ingredient, step, timestamp) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `
            UPDATE recipes SET
            title = COALESCE($1, title),
            ingredient = COALESCE($2, ingredient),
            step = COALESCE($3, step),
            updated_at = COALESCE($4, updated_at)
            WHERE id = $5
            `,
        [title, ingredient, step, timestamp, id],
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
