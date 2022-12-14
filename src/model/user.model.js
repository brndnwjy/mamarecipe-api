const pool = require("../config/db");

const userModel = {
  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM users WHERE user_id = '${id}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  register: ({ user_id, name, email, phone, hashedPassword, role, date }) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO users (user_id, name, email, phone, password, role, created_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [user_id, name, email, phone, hashedPassword, role, date],
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  emailCheck: (email) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  updateAccount: ({id, name, file, date}) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `
          UPDATE users SET
          name = COALESCE($1, name),
          avatar = COALESCE($2, avatar),
          updated_at = COALESCE($3, updated_at)
          WHERE user_id = $4
          `,
        [name, file, date, id],
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },


  deleteAccount: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(`DELETE FROM users WHERE user_id = '${id}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  activation: (id) => {
    return pool.query("UPDATE users SET status = 1 where user_id = $1", [id]);
  },
};

module.exports = userModel;
