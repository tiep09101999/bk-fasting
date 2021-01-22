const { is } = require("bluebird");

const passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy;
UserModel = require("../model/user");

let initPassPortFB = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: "504436240364704",
        clientSecret: "f7e19551e4b557e6eb9d914f79346e63",
        callbackURL: "http://localhost:8888/auth/facebook/callback",
        passReqToCallback: true,
        profileFields: ["email", "gender", "displayName"],
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          let user = await UserModel.findUserByFbUid(profile.id);
          if (user) {
            return done(null, user);
          }
          // console.log(profile);
          let newUserItem = {
            username: profile.displayName,
            gender: profile.gender,
            facebook: {
              uid: profile.id,
              token: accessToken,
              email: profile.emails[0].value,
            },
          };

          let newUser = await UserModel.createNew(newUserItem);
          return done(null, newUser);
        } catch (error) {
          console.log(error);
          return done(null, false);
        }
      }
    )
  );
  // save User id to Session
  passport.serializeUser((user, done) => {
    //console.log(user);
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await UserModel.findUserById(id);
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  });
};

module.exports = initPassPortFB;
