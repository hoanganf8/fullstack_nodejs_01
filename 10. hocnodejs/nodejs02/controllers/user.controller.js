const userModel = require("../models/user.model");
const moment = require("moment");
const { object, string } = require("yup");
module.exports = {
  index: async (req, res) => {
    const { status, keyword } = req.query;
    let statusBool;
    if (status === "active" || status === "inactive") {
      statusBool = status === "active" ? true : false;
    }

    //Đọc dữ liệu từ database
    const users = await userModel.all(statusBool, keyword);

    res.render("users/index", { users, moment, status, keyword });
  },
  add: (req, res) => {
    // const errors = req.flash("errors");
    // console.log(errors);
    // console.log(req.errors);
    res.render("users/add", { req });
  },
  handleAdd: async (req, res) => {
    const schema = object({
      name: string().required("Tên bắt buộc phải nhập"),
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng")
        .test("unique", "Email đã tồn tại trên hệ thống", async (value) => {
          return await userModel.emailUnique(value);
        }),
    });
    try {
      const body = await schema.validate(req.body, { abortEarly: false });
      // const result = await userModel.emailUnique(body.email);
      // console.log(result);
    } catch (e) {
      const errors = Object.fromEntries(
        e?.inner.map((item) => [item.path, item.message]),
      );
      req.flash("errors", errors);
      req.flash("old", req.body);
    }
    return res.redirect("/users/add");
  },
};
