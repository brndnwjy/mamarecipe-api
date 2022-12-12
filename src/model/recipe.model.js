const pool = require("../config/db");

const recipeModel = {
  getAll: (search, sortBy, sortOrder, limit, offset) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT users.name as recipe_owner, recipes.* FROM recipes JOIN users using(user_id) WHERE title ILIKE '%${search}%' ORDER BY ${sortBy} ${sortOrder} 
        LIMIT ${limit} OFFSET ${offset}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  getOwnRecipe: (id, sortBy, sortOrder, limit, offset) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM recipes WHERE user_id = '${id}' ORDER BY ${sortBy} ${sortOrder} 
        LIMIT ${limit} OFFSET ${offset}`,
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
      pool.query(
        `SELECT users.name AS recipe_owner, recipes.* FROM recipes JOIN users USING (user_id) WHERE recipe_id = '${id}'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  countRecipe: () => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT COUNT(*) AS total FROM recipes", (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  countFilterRecipe: (search) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT COUNT(*) AS total FROM recipes WHERE title ILIKE '%${search}%'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  insertRecipe: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO recipes (recipe_id, user_id, title, ingredient, photo, created_at)
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          data.recipe_id,
          data.user_id,
          data.title,
          data.ingredient,
          data.file,
          data.date,
        ],
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  updateRecipe: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `
            UPDATE recipes SET
            title = COALESCE($1, title),
            ingredient = COALESCE($2, ingredient),
            photo = COALESCE($3, photo),
            updated_at = COALESCE($4, updated_at)
            WHERE recipe_id = $5
            `,
        [
          data.title,
          data.ingredient,
          data.file,
          data.date,
          data.id,
        ],
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  // insertRecipe: ({recipe_id, user_id, title, ingredient, photo, date}) => {
  //   return new Promise((resolve, reject) => {
  //     pool.query(
  //       `INSERT INTO recipes (recipe_id, user_id, title, ingredient, photo, created_at)
  //           VALUES ($1, $2, $3, $4, $5, $6)`,
  //       [recipe_id, user_id, title, ingredient, photo, date],
  //       (err, res) => {
  //         if (err) {
  //           reject(err);
  //         }
  //         resolve(res);
  //       }
  //     );
  //   });
  // },

  // updateRecipe: (id, title, ingredient, photo, date) => {
  //   return new Promise((resolve, reject) => {
  //     pool.query(
  //       `
  //           UPDATE recipes SET
  //           title = COALESCE($1, title),
  //           ingredient = COALESCE($2, ingredient),
  //           photo = COALESCE($3, photo),
  //           updated_at = COALESCE($4, updated_at)
  //           WHERE recipe_id = $5
  //           `,
  //       [title, ingredient, photo, date, id],
  //       (err, res) => {
  //         if (err) {
  //           reject(err);
  //         }
  //         resolve(res);
  //       }
  //     );
  //   });
  // },

  deleteRecipe: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM recipes WHERE recipe_id = '${id}'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
};

module.exports = recipeModel;
