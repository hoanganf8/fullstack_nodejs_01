const moment = require("moment");
const model = require("../models/index");
const { Op } = require("sequelize");
const User = model.User;
module.exports = {
  index: async (req, res) => {
    const { status, keyword } = req.query;
    const filter = {
      // deleted_at: {
      //   [Op.not]: null,
      // },
    };
    if (status === "active" || status === "inactive") {
      filter.status = status === "active" ? true : false;
    }
    if (keyword) {
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
    const limit = 3;
    const { page = 1 } = req.query;

    const offset = (page - 1) * limit;
    const { rows: users, count } = await User.findAndCountAll({
      order: [["id", "desc"]],
      where: filter,
      //paranoid: false,
      limit,
      offset,
      include: {
        model: model.Phone,
        as: "phones",
      },
    });
    const totalPage = Math.ceil(count / limit);
    // const getPhone = async (user) => {
    //   const phones = await user.getPhone();
    //   console.log(phones.phone);
    // };
    res.render("users/index", { users, moment, totalPage, page });
  },
  add: (req, res) => {
    res.render("users/add");
  },
  handleAdd: async (req, res, next) => {
    const body = req.body;
    try {
      const user = await User.create(body);
      if (user) {
        return res.redirect("/users");
      }
    } catch (e) {
      return next(e); //Gọi error handler
    }
  },
  edit: async (req, res, next) => {
    const { id } = req.params;
    try {
      // const user = await User.findByPk(id);
      const user = await User.findOne({
        where: { id },
      });
      if (!user) {
        throw new Error("User không tồn tại");
      }
      // const phones = await user.getPhone();
      // const phone = phones.phone;
      // console.log(phone);
      // const phones = await model.Phone.findOne({
      //   where: {
      //     phone: "0123456789",
      //   },
      // });
      // const userByPhone = await phones.getUser();
      // console.log(userByPhone);
      res.render("users/edit", { user });
    } catch (e) {
      return next(e);
    }
  },
  handleEdit: async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    await User.update(body, {
      where: { id },
    });
    return res.redirect("/users/edit/" + id);
  },
  delete: async (req, res) => {
    const { id } = req.params;
    await User.destroy({ where: { id }, force: true });
    return res.redirect("/users");
  },
};

/*
Ví dụ về việc insert dữ liệu vào nhiều bảng
Products --> Lấy product_id vừa insert --> Insert vào bảng product_images (product_id là khóa ngoại)

Thuật toán phân trang
- Lấy tổng số bản ghi (Bao gồm cả kết quả lọc)
- Xác định giới hạn bản ghi trên 1 trang
- Tính tổng số trang: Tổng số bản ghi / Giới hạn 1 trang ==> Làm tròn lên
- Tính offset dựa vào page: offset = (page - 1) * limit
- Đưa limit, offset vào query (sql, orm)
- Xử lý hiển thị: Danh sách, phân trang
*/
