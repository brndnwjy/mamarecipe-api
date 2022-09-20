const userModel = require("../model/user.model");
const createError = require("http-errors");

const userController = {
  getAll: (req, res, next) => {
    userModel
      .getAll()
      .then((result) => {
        res.json(result.rows);
      })
      .catch(() => {
        next(new createError.InternalServerError());
      });
  },

  getDetail: (req, res, next) => {
    const id = req.params.id;
    userModel
      .getDetail(id)
      .then((result) => {
        res.json(result.rows);
      })
      .catch(() => {
        next(new createError.InternalServerError());
      });
  },

  signUp: (req, res, next) => {
    const { name, email, phone, password } = req.body;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const timestamp = `${date} - ${time}`;
    userModel
      .signUp(name, email, phone, password, timestamp)
      .then(() => {
        res.json("Sign Up Success");
      })
      .catch(() => {
        next(new createError.InternalServerError());
      });
  },

  signIn: (req, res, next) => {
    const { email, password } = req.body;
    userModel
      .check(email, password)
      .then((result) => {
        const { name } = result.rows[0];
        res.json(`Welcome, ${name}`);
      })
      .catch(() => {
        next(new createError.InternalServerError());
      });
  },

  updateAccount: (req, res, next) => {
    const id = req.params.id;
    const { name, email, phone, password } = req.body;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const timestamp = `${date} - ${time}`;
    userModel
      .updateAccount(id, name, email, phone, password, timestamp)
      .then(() => {
        res.json("Account Updated");
      })
      .catch(() => {
        next(new createError.InternalServerError());
      });
  },

  deleteAccount: (req, res, next) => {
    const id = req.params.id;
    userModel
      .deleteAccount(id)
      .then(() => {
        res.json("Account Deleted");
      })
      .catch(() => {
        next(new createError.InternalServerError());
      });
  },
};

module.exports = userController;
