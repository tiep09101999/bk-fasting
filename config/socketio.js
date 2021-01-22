const passportSocketio = require("passport.socketio");
let configSocketio = (io, cookieParser, sessionStore) => {
  io.use(
    passportSocketio.authorize({
      cookieParser: cookieParser,
      key: "express.sid",
      secret: "mySecret",
      store: sessionStore,
      success: (data, accept) => {
        if (!data.user.logged_in) {
          return accept("Invalid user", false);
        }
        return accept(null, true);
      },
      fail: (data, message, error, accept) => {
        if (error) {
          console.log("failed connection to socket.io: ", message);
          return accept(new Error(message), false);
        }
      },
    })
  );
};

module.exports = {
  configSocketio: configSocketio,
};
