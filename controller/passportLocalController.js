let passport = require("passport");
let passportLocal = require("passport-local");
let UserModel = require("../model/user");

// Kiểm tra tài khoản user bằng local
let localStrategy = passportLocal.Strategy;
let initPassportLocal = () => {
  passport.use(
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          // console.log(email);
          let user = await UserModel.findByEmailLocal(email);
          // Tham số của done:
          // thứ nhất là null ( k có lỗi trả về),
          // thứ 2 là false ( k có giá trị trả về),
          // req.flash
          if (!user) {
            console.log("cant find user");
            return done(null, false);
          }

          // let checkPassword = await user.comparePassword(password);
          let checkPassword = user.comparePassword(password);
          if (!checkPassword) {
            console.log("pass wrong");
            return done(null, false);
          }
          console.log("done");
          let content = `Xin chào ${email}`;
          return done(null, user);
        } catch (e) {
          return done(null, false);
        }
      }
    )
  );

  // lưu userId vào session
  passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await UserModel.findUserById(id);

      return done(null, user);
    } catch (error) {
      return done(e, null);
    }
  });
};

module.exports = initPassportLocal;
