const moment = require("moment");
const model = require("../models/index");
const { Op } = require("sequelize");
const User = model.User;
module.exports = {
  index: async (req, res) => {
    const { status, keyword } = req.query;
    const filter = {};
    if (status === "active" || status === "inactive") {
      filter.status = status === "active" ? true : false;
    }
    if (keyword) {
      //   filter.email = {
      //     [Op.like]: `%${keyword.toLowerCase()}%`,
      //   };
      filter[Op.or] = [
        {
          name: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
        {
          email: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
      ];
    }
    const users = await User.findAll({
      order: [["id", "desc"]],
      where: filter,
    });
    res.render("users/index", { users, moment });
  },
};
