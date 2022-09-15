const userModel = require("../model/user.model");

const userController = {
  getAll: (req, res) => {
    userModel
      .getAll()
      .then((result) => {
        res.json(result.rows);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  getDetail: (req, res) => {
    const id = req.params.id;
    userModel
      .getDetail(id)
      .then((result) => {
        res.json(result.rows);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  signUp: (req, res) => {
    const { name, email, phone, password } = req.body;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const timestamp = `${date} - ${time}`;
    userModel
      .signUp(name, email, phone, password, timestamp)
      .then(() => {
        res.json("Sign Up Success");
      })
      .catch((err) => {
        res.json(err);
      });
  },
  signIn: (req, res) => {
    const { email, password } = req.body;
    userModel
      .check(email, password)
      .then((result) => {
        const { name } = result.rows[0];
        res.json(`Welcome, ${name}`);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  updateAccount: (req, res) => {
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
      .catch((err) => {
        res.json(err);
      });
  },
  deleteAccount: (req, res) => {
    const id = req.params.id;
    userModel
      .deleteAccount(id)
      .then(() => {
        res.json("Account Deleted");
      })
      .catch((err) => {
        res.json(err);
      });
  },
};

module.exports = userController;
