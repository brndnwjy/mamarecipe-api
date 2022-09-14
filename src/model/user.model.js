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
  signUp: (name, email, phone, password) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO users (name, email, phone, password)
          VALUES ('${name}', '${email}', '${phone}', '${password}')`,
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
  updateAccount: (id, name, email, phone, password) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `
          UPDATE users SET
          name = COALESCE('${name}', name),
          email = COALESCE('${email}', email),
          phone = COALESCE('${phone}', phone),
          password = COALESCE('${password}', password)
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
