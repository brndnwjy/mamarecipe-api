const { unlink } = require("fs");
const path = require("path");
const { getDetail } = require("../model/user.model");

const userRemoveImg = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      rows: [user],
    } = await getDetail(id);

    console.log(user);

    if (user.avatar) {
      const file = path.basename(user.avatar);
      unlink(`./upload/user/${file}`, (err) => {
        if (err) {
          console.log(err);
          next();
        }
      });
    }
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = userRemoveImg;
