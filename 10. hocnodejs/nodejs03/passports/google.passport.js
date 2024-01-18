const GoogleStrategy = require("passport-google-oauth20");
module.exports = new GoogleStrategy(
  {
    clientID:
      "831047813879-lm276r5sqqjogb3aovlrgjm1va07godf.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback",
    scope: ["profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    //Logic lấy thông tin user từ database
    //Thêm user vào database
    //Chú ý khi kiểm tra: provider và email
    cb(null, {});
  },
);
