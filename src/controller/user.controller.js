const userModel = require("../model/user.model");
const { v4: uuidv4 } = require("uuid");
const { hash, compare } = require("bcryptjs");
const createError = require("http-errors");
const generateToken = require("../helper/auth.helper");

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

  signUp: async (req, res, next) => {
    const id = uuidv4();
    const { name, email, phone, password, role } = req.body;
    const hashedPassword = await hash(password, 10);
    const avatar = req.file.filename;
    const date = new Date();
    const { rowCount: check } = await userModel.emailCheck(email);

    if (check) {
      return next(createError(403, "E-mail already in use"));
    }

    userModel
      .signUp(id, name, email, phone, hashedPassword, avatar, role, date)
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
      .emailCheck(email)
      .then(async (result) => {
        const { rowCount: check } = result;
        if (!check) {
          return next(createError(403, "E-mail or password incorrect!"));
        }

        const {
          rows: [user],
        } = result;
        const savedPassword = user.password;

        const valid = await compare(password, savedPassword);
        if (!valid) {
          return next(createError(403, "E-mail or password incorrect!"));
        }

        const token = generateToken({
          id: user.user_id,
          name: user.name,
          role: user.role,
        });

        res.json({
          message: "login success",
          token,
        });
      })
      .catch(() => {
        next(new createError.InternalServerError());
      });
  },

  updateAccount: (req, res, next) => {
    const id = req.params.id;
    const { name, email, phone } = req.body;
    const avatar = req.file.filename;
    const date = new Date()
    userModel
      .updateAccount(id, name, email, phone, avatar, date)
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
