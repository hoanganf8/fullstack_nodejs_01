const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const passportLocal = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    //Xác thực email và password có tồn tại trong Database hay không?
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return done(null, false, { message: "Email không tồn tại" });
    }

    const passwordHash = user.password; //Lấy password hash từ database
    const result = bcrypt.compareSync(password, passwordHash);
    if (result) {
      return done(null, user); //Lưu user vào session
    }

    done(null, false, { message: "Mật khẩu không chính xác" });
  },
);

module.exports = passportLocal;
