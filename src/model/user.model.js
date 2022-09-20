const pool = require("../config/db");

const userModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM users", (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  signUp: (name, email, phone, password, timestamp) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO users (name, email, phone, password, created_at)
          VALUES ($1, $2, $3, $4, $5)`,
        [name, email, phone, password, timestamp],
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  check: (email, password) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  updateAccount: (id, name, email, phone, password, timestamp) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `
          UPDATE users SET
          name = COALESCE($1, name),
          email = COALESCE($2, email),
          phone = COALESCE($3, phone),
          password = COALESCE($4, password),
          updated_at = COALESCE($5, updated_at)
          WHERE id = $6
          `,
        [name, email, phone, password, timestamp, id],
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
      pool.query(`DELETE FROM users WHERE id = ${id};`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};

module.exports = userModel;
