const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../models/index");
module.exports = {
  login: async (req, res) => {
    //Lấy body
    const { email, password } = req.body;
    //Validate
    const response = {};
    if (!email || !password) {
      Object.assign(response, {
        status: 400,
        message: "Bad Request",
        error: "Vui lòng nhập email và mật khẩu",
      });
    } else {
      //Kiểm tra email có tồn tại trong Database không?
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        Object.assign(response, {
          status: 400,
          message: "Bad Request",
          error: "Email hoặc mật khẩu không chính xác",
        });
      } else {
        //Lấy password hash
        const { password: hash } = user;
        //Compare plain password với password hashs
        const result = bcrypt.compareSync(password, hash);
        if (!result) {
          Object.assign(response, {
            status: 400,
            message: "Bad Request",
            error: "Email hoặc mật khẩu không chính xác",
          });
        } else {
          //Tạo Token (JWT)
          const { JWT_SECRET, JWT_EXPIRE } = process.env;
          const token = jwt.sign(
            {
              data: user.id,
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRE },
          );
          Object.assign(response, {
            status: 200,
            message: "Success",
            access_token: token,
          });
        }
      }
    }

    res.status(response.status).json(response);
  },
  profile: async (req, res) => {
    const bearer = req.get("Authorization");
    const response = {};
    if (bearer) {
      const token = bearer.replace("Bearer", "").trim();
      const { JWT_SECRET } = process.env;
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const { data: userId } = decoded;
        const user = await User.findByPk(userId);
        Object.assign(response, {
          status: 200,
          message: "Success",
          data: user,
        });
      } catch (e) {
        Object.assign(response, {
          status: 401,
          message: "Unauthorized",
        });
      }
    } else {
      Object.assign(response, {
        status: 401,
        message: "Unauthorized",
      });
    }
    res.json(response);
  },
};
