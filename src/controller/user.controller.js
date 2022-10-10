const userModel = require("../model/user.model");
const { v4: uuidv4 } = require("uuid");
const { hash, compare } = require("bcryptjs");
const createError = require("http-errors");
const generateToken = require("../helper/auth.helper");
const response = require("../helper/response.helper");
const emailActivation = require("../helper/activation.helper");

const userController = {
  getAll: (req, res, next) => {
    userModel
      .getAll()
      .then((result) => {
        response(res, result.rows, 200, "Get all users success");
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
        response(res, result.rows, 200, "Get user detail success");
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

    const data = {
      user_id: id,
      name,
      email,
      phone,
      role,
      avatar,
      date,
    };

    emailActivation(data)

    userModel
      .signUp(id, name, email, phone, hashedPassword, avatar, role, date)
      .then(() => {
        response(res, data, 200, "Sign up success");
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

        response(res, {token}, 200, `Logged in! Welcome, ${user.name}`);
      })
      .catch(() => {
        next(new createError.InternalServerError());
      });
  },

  updateAccount: (req, res, next) => {
    const id = req.params.id;
    const { name, email, phone } = req.body;
    const avatar = req.file.filename;
    const date = new Date();
    userModel
      .updateAccount(id, name, email, phone, avatar, date)
      .then(() => {
        response(res, null, 200, "Account updated");
      })
      .catch(() => {
        next(new createError.InternalServerError());
      });
  },

  deleteAccount: async (req, res, next) => {
    const id = req.params.id;
    let user;

    await userModel.getDetail(id).then((result) => {
      user = result.rows[0];
    });

    console.log(user)

    delete user.avatar;
    delete user.password;

    userModel
      .deleteAccount(id)
      .then(() => {
        response(res, user, 200, "Account deleted");
      })
      .catch(() => {
        next(new createError.InternalServerError());
      });
  },

  activation: (req, res, next) => {
    const id = req.params.id
    console.log(id)
    userModel.activation(id)
    .then((result) => {
      response(res, result, 200, "Account activated")
    })
    .catch(() => {
      next(new createError.InternalServerError());
    });
  }
};

module.exports = userController;
