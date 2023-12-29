const userModel = require("../models/user.model");
const moment = require("moment");
module.exports = {
  index: async (req, res) => {
    const { status, keyword } = req.query;
    let statusBool;
    if (status === "active" || status === "inactive") {
      statusBool = status === "active" ? true : false;
    }

    //Đọc dữ liệu từ database
    const users = await userModel.all(statusBool, keyword);

    res.render("users/index", { users, moment });
  },
};
